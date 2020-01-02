import * as deps from './deps.ts';
import { WebSocketMessage, WebSocket } from "./deps.ts";
export class SockList extends Array<WebSocket>{
    constructor(...items){
        super();
        this.push(...items);
    }
};
export const defaultSockKey = 'default';
export abstract class Layer<T> extends Map<string,T>{
    abstract async send(key:string, data: deps.WebSocketMessage): Promise<void>;
    createOrGet(key, Construct: {new(): T}) {
        if(!this.has(key)) {
            this.set(key, new Construct());
        }
        return this.get(key);
    }
    constructor() {
        super();
        return new Proxy(this, {
            get(target, k) {
                if (k in target) {
                    return Reflect.get(target, k).bind(target);
                } else {
                    return target.get(k.toString());
                }
            }
        })
    }
}
export class Room extends Layer<SockList>{
    constructor(){
        super();
        this.createOrGet(defaultSockKey, SockList);
    }
    async send(key: string, data: deps.WebSocketMessage): Promise<void> {
        for(const socket of this.createOrGet(key, SockList)) {
            await socket.send(data);
        }
    }

}
export class Namespace extends Layer<Room>{
    constructor(){
        super();
        this.createOrGet(defaultSockKey, Room);
    }
    async send(key: string, data: deps.WebSocketMessage): Promise<void> {
        const roomGroup = this.createOrGet(key, Room);
        for (const roomName of roomGroup.keys()) {
            await roomGroup.send(roomName, data);
        }
    }
}