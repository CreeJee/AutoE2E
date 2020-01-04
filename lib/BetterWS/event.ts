import * as Base from './type.ts';
export class EventManager implements Base.WSEventList{
    onMessage: Base.SockHandleArray = [];
    onConnect: Base.SockHandleArray = [];
    onPing: Base.SockHandleArray = [];
    onPong: Base.SockHandleArray = [];
    onDisconnect: Base.SockHandleArray = [];
    onBinary: Base.SockHandleArray = [];
    register(eventInstance: Base.ISockEvent) {
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
export class SockBaseEvent implements Base.ISockEvent{
    constructor() {
        _baseEvent.register(this)
    }
}
export const baseEvent = _baseEvent;
