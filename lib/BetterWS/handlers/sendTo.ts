import { SockHandleType } from "../type.ts";
import { WebSocketEvent } from "../deps.ts";

export default class SendTo implements SockHandleType{
    onMessage(data: WebSocketEvent): Promise<void>{
        debugger;
        return Promise.resolve();  
    };
}