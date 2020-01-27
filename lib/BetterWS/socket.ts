import { WebSocket, ServerRequest, acceptWebSocket, WebSocketEvent } from "./mod.ts";
import { SockMessage, DisconnectEvent, SockEvent } from "./type.ts";
export type ICloseReason = {
  code: number;
  reason?: string;
}
export interface ISocket {
    readonly serverRequest: ServerRequest;
    readonly originalSock: WebSocket;
    init(): Promise<ISocket>;
    send(key:string, data: SockMessage): Promise<void>
    close(info: ICloseReason): Promise<void>;
    receive(): AsyncIterableIterator<SockEvent>
}
// simple websocket wrapper
export class Sock implements ISocket {
    private _sock: WebSocket;
    private _serverRequest: ServerRequest;
    constructor(serverRequest: ServerRequest) {
        this._serverRequest = serverRequest;
    }
    async init(): Promise<ISocket> {
        const {conn, r,w, headers} = this.serverRequest;
        this._sock = await acceptWebSocket({
            conn,
            headers,
            bufReader: r,
            bufWriter: w
        });
        return this;
    }
    get serverRequest() {
        return this._serverRequest;
    }
    get originalSock() {
        return this._sock;
    }
    async send(event:string, data :SockMessage){
        return this._sock.send(`${event}:${data}`);
    }
    async close(info: ICloseReason) {
        this._sock.close(info.code, info.reason);
    }
    async *receive(): AsyncIterableIterator<WebSocketEvent>{
        return this._sock.receive();
    }
    
}