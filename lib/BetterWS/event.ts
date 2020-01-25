import * as Base from './type.ts';
import handlers from './handlers/mod.ts'
export class EventManager implements Base.WSEventList{
    onMessage: Base.SockHandleArray = [];
    onConnect: Base.SockHandleArray = [];
    onPing: Base.SockHandleArray = [];
    onPong: Base.SockHandleArray = [];
    onDisconnect: Base.SockHandleArray = [];
    onBinary: Base.SockHandleArray = [];
    private iterateHooks: string[] = Object.getOwnPropertyNames(this);
    register(eventInstance: Base.ISockEvent) {
        for (const eventName of this.iterateHooks) {
            const currentProp: Base.SockHandle = eventInstance[eventName];
            if(currentProp instanceof Function) {
                this[eventName].push(currentProp);
            }
        }
    }
    add(EventClass: Base.ISockEventClass) {
        this.register(new EventClass);
    }
    clone(): EventManager {
        const eventManager = new EventManager();
        for (const eventName of this.iterateHooks) {
            const currentProp: Base.SockHandleArray = this[eventName];
            eventManager[eventName].push(...currentProp);
        }
        return eventManager;
    }
}
const _baseEvent = new EventManager();
for (const Event of handlers) {
    _baseEvent.register(new Event());
}
export const baseEvent = _baseEvent;
