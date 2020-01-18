// import * as WebSocket from 'dom.lib'
import { WS as WSConf } from '../../../Config';
import { AdapterHandler, IAdapter, IResponseType} from '../../../struct/Interface/SockAdapter';



export default class WsAdapter<T extends IResponseType> implements IAdapter<T> {
    private ws: WebSocket;
    
    private messageStore: Map<string, T>;
    private eventStore: Map<string, Array<AdapterHandler<T>>>;
    constructor() {
        const url = `${WSConf.protocol}://${WSConf.host}${WSConf.path}`;
        this.ws = new WebSocket(url);
        this.messageStore = new Map<string, T>();
        this.eventStore = new Map<string,Array<AdapterHandler<T>>>();
        this.ws.addEventListener('message', (event: {data: T}) => {
            const data = event.data;
            const eventQueue = this.eventStore.get(data.key);
            if(Array.isArray(eventQueue)) {
                for (const call of eventQueue) {
                    call(data);
                }
            }
            
        })
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
    public bind(key: string, on: AdapterHandler<T>) {
        type Adapter = Array<AdapterHandler<T>>;
        let store:Adapter;
        if (!this.eventStore.has(key)) {
            this.eventStore.set(key, store = [])
        } else {
            store = this.eventStore.get(key) as Adapter;
        }
        store.push(on);
    }
    public unBind(key: string, on: AdapterHandler<T>) {
        type Adapter = Array<AdapterHandler<T>>;
        if (this.eventStore.has(key)) {
            const store: Adapter = this.eventStore.get(key) as Adapter;
            const pos = store.indexOf(on);
            if (pos >= 0) {
                store.splice(pos, 1);
            }
        }
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
            console.log(this.ws)
            // this.ws.send(`{key:${key}, data:'request'}`);
        });
    }
}
export const Instance = new WsAdapter();
