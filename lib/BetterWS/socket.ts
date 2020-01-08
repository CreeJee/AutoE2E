import { WebSocket } from "./mod.ts";
import { SockMessage } from "./type.ts";

export class Sock {
    private _sock: WebSocket;
    constructor(sock: WebSocket) {
        this._sock = sock;
    }
    async send(data :SockMessage){
        return this._sock.send(data);
    }
}