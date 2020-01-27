// import * as WebSocket from 'dom.lib'
import { WS as WSConf } from '../../../Config';
import { AdapterHandler, IAdapter, IResponseType} from '../../../struct/Interface/SockAdapter';


type IRT = IResponseType;

function decryptMessage<RT = object>(str: string): IResponseType<RT> {
    const delimiterPos = str.indexOf(':');
    const key = str.slice(0,delimiterPos);
    const data = JSON.parse(str.slice(delimiterPos+1)) as RT;
    return {key,data} as IResponseType<RT>;
}
function encryptMessage(payload: IRT) {
    return `${payload.key}:${payload.data}`;
}
export default class BetterWS implements IAdapter{
    private ws: WebSocket;
    
    private messageStore: Map<string, IRT> = new Map<string, IRT>();
    private eventStore: Map<string, Array<AdapterHandler<IRT>>> = new Map<string,Array<AdapterHandler<IRT>>>();
    constructor() {
        const url = `${WSConf.protocol}://${WSConf.host}${WSConf.path}`;
        this.ws = new WebSocket(url);
        this.ws.addEventListener('message', ({data}: {data: string}) => {
            const convertData = decryptMessage(data);
            const eventQueue = this.eventStore.get(convertData.key);
            if(Array.isArray(eventQueue)) {
                for (const call of eventQueue) {
                    call(convertData);
                }
            }
            
        })
    }
    public send<RequestType extends IRT = IRT>(payload: RequestType): void {
        this.ws.send(encryptMessage(payload));
    }
    
    public async get<ResponseType extends IRT = IRT>(key: string, force: boolean = false): Promise<ResponseType> {
        const store = this.messageStore;
        if (store.has(key) && !force) {
            return store.get(key) as ResponseType;
        }
        return this.lazyResponse(key);
    }
    public async dispatch<RequestType extends IRT = IRT, ResponseType extends IRT = IRT>(key: string, payload: RequestType){
        const binded = this.get<ResponseType>(key, true);
        this.send<RequestType>(payload);
        return binded;
    };
    public bind<ResponseType extends IRT = IRT>(key: string, on: AdapterHandler<ResponseType>) {
        type Adapter = Array<AdapterHandler<ResponseType>>;
        let store: Adapter;
        if (!this.eventStore.has(key)) {
            this.eventStore.set(key, store = [])
        } else {
            store = this.eventStore.get(key) as Adapter;
        }
        store.push(on);
    }
    public unBind<ResponseType extends IRT = IRT>(key: string, on: AdapterHandler<ResponseType>) {
        type Adapter = Array<AdapterHandler<ResponseType>>;
        if (this.eventStore.has(key)) {
            const store: Adapter = this.eventStore.get(key) as Adapter;
            const pos = store.indexOf(on);
            if (pos >= 0) {
                store.splice(pos, 1);
            }
        }
    }
    private async lazyResponse<ResponseType extends IRT = IRT>(key: string): Promise<ResponseType> {
        return new Promise((resolve) => {
            const offEvent = ({data}: {data: string}) => {
                const value: IResponseType<ResponseType> = decryptMessage<ResponseType>(data);
                this.messageStore.set(key, value);
                if (key === value.key) {
                    this.ws.removeEventListener('message', offEvent);
                    resolve(value.data);
                }
            };
            this.ws.addEventListener('message', offEvent);
        });
    }
}
export const Instance = new BetterWS();
