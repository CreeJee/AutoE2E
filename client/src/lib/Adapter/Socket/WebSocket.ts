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
    public send<RequestType extends T = T>(payload: RequestType): void {
        this.ws.send(`${payload.key}:${JSON.stringify(payload.data)}`);
    }
    
    public async get<ResponseType extends T = T>(key: string, force: boolean = false): Promise<ResponseType> {
        const store = this.messageStore;
        if (store.has(key) && !force) {
            return store.get(key) as ResponseType;
        }
        return this.lazyResponse(key);
    }
    public async dispatch<RequestType extends T = T, ResponseType extends T = T>(key: string, payload: RequestType){
        const binded = this.get<ResponseType>(key, true);
        this.send<RequestType>(payload);
        return binded;
    };
    public bind<ResponseType extends T = T>(key: string, on: AdapterHandler<ResponseType>) {
        type Adapter = Array<AdapterHandler<ResponseType>>;
        let store:Adapter;
        if (!this.eventStore.has(key)) {
            this.eventStore.set(key, store = [])
        } else {
            store = this.eventStore.get(key) as Adapter;
        }
        store.push(on);
    }
    public unBind<ResponseType extends T = T>(key: string, on: AdapterHandler<ResponseType>) {
        type Adapter = Array<AdapterHandler<ResponseType>>;
        if (this.eventStore.has(key)) {
            const store: Adapter = this.eventStore.get(key) as Adapter;
            const pos = store.indexOf(on);
            if (pos >= 0) {
                store.splice(pos, 1);
            }
        }
    }
    private async lazyResponse<ResponseType extends T = T>(key: string): Promise<ResponseType> {
        return new Promise((resolve) => {
            const offEvent = (event: { data: any; }) => {
                const value: ResponseType = JSON.parse(event.data.toString()) as ResponseType;
                this.messageStore.set(key, value);
                if (key === value.key) {
                    this.ws.removeEventListener('message', offEvent);
                    resolve(value);
                }
            };
            this.ws.addEventListener('message', offEvent);
            // this.ws.send(`{key:${key}, data:'request'}`);
        });
    }
}
export const Instance = new WsAdapter();
