import WebSocket from 'ws';
import { IAdapter } from '../struct/SockAdapter';
import { WS } from '../Config';
export default class WsAdapter<T = object> implements IAdapter<T>{
    private ws: WebSocket;
    private messageStore: Map<string, T>;
    constructor() {
        this.ws = new WebSocket(`ws://${WS.host}${WS.path}`, {});
        this.messageStore = new Map<string, T>();
    }
    async send(payload: T): Promise<void>{
        return new Promise<void>((resolve, reject)=> {
            this.ws.send(JSON.stringify(payload),(err) => err ? reject(err) : resolve());
        })
    }
    async get(key: string, force: boolean = false): Promise<T> {
        const store = this.messageStore; 
        if (store.has(key) && !force) {
            return <T>store.get(key);
        }
        return this.observeLazyStack(key);
    }
    private async observeLazyStack(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const offEvent = (event: { data: any; type: string; target: WebSocket }) => {
                const data = event.data;
                const value: T = <T>JSON.parse(data);
                this.messageStore.set(key, value);
                if (key)
                    this.ws.removeEventListener('message', offEvent);
                    resolve(value)
            };
            this.ws.addEventListener('message',offEvent) 
        })
    }
    
}
export const Instance = new WsAdapter();