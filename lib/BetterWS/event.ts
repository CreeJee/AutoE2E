import * as Base from './type.ts'
import * as defaultEvent from './handlers/mod.ts'
export class EventManager implements Base.WSEventList{
    onMessage: Base.SockHandleArray = [];
    onConnect: Base.SockHandleArray = [];
    onPing: Base.SockHandleArray = [];
    onPong: Base.SockHandleArray = [];
    onDisconnect: Base.SockHandleArray = [];
    onBinary: Base.SockHandleArray = [];
    
    register(eventInstance: Base.SockEvent) {
        for (const eventName in eventInstance) {
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
export const baseEvent = new EventManager();
for (const event of Object.values(defaultEvent)) {
    baseEvent.register(event)
}
