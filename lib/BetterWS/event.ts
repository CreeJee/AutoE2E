import * as Base from './type.ts';
import EchoHandler from './handlers/test.ts';
export class EventManager implements Base.WSEventList{
    onMessage: Base.SockHandleArray = [];
    onConnect: Base.SockHandleArray = [];
    onPing: Base.SockHandleArray = [];
    onPong: Base.SockHandleArray = [];
    onDisconnect: Base.SockHandleArray = [];
    onBinary: Base.SockHandleArray = [];
    register(eventInstance: Base.SockEvent) {
        for (const eventName of Object.getOwnPropertyNames(this)) {
            const currentProp = eventInstance[eventName];
            if(currentProp instanceof Function) {
                this[eventName].push(currentProp);
            }
        }
    }
    clone(): Base.WSEventList {
        return {
            onMessage: [...this.onMessage],
            onConnect: [...this.onConnect],
            onPing: [...this.onPing],
            onPong: [...this.onPong],
            onDisconnect: [...this.onDisconnect],
            onBinary: [...this.onBinary]
        }
    }
}
const _baseEvent = new EventManager();
_baseEvent.register(new EchoHandler());
export const baseEvent = _baseEvent;
