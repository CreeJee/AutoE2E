// import * as WebSocket from 'dom.lib'
import { WS as WSConf } from '../../../Config';
import { IAdapter, IResponseType } from '../../../struct/Interface/SockAdapter';



export default class WsAdapter<T extends IResponseType> implements IAdapter<T> {
    private ws: WebSocket;
    
    private messageStore: Map<string, T>;
    constructor() {
        const url = `${WSConf.protocol}://${WSConf.host}${WSConf.path}`;
        this.ws = new WebSocket(url);
        this.messageStore = new Map<string, T>();
    }
    public async send(payload: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.ws.send(JSON.stringify(payload));
        });
    }
    public async get(key: string, force: boolean = false): Promise<T> {
        const store = this.messageStore;
        if (store.has(key) && !force) {
            return store.get(key) as T;
        }
        return this.lazyResponse(key);
    }
    private async lazyResponse(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const offEvent = (event: { data: any; }) => {
                const value: T = JSON.parse(event.data.toString()) as T;
                this.messageStore.set(key, value);
                if (key === value.key) {
                    this.ws.removeEventListener('message', offEvent);
                    resolve(value);
                }
            };
            this.ws.addEventListener('message', offEvent);
        });
    }

}
export const Instance = new WsAdapter();
