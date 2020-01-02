
import {Flow, isPrimitive, hasInstance, FlowHandlers, Cond} from "./flow.ts";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    isWebSocketPongEvent,
    WebSocket,
    ServerRequest
} from "./deps.ts";
import * as Base from './type.ts'
import * as Layer from './layer.ts'
import {baseEvent} from './event.ts';
export class BetterWS{
    private flow: Flow;
    readonly events: Base.WSEventList;
    readonly connection: Layer.Namespace = new Layer.Namespace();
    readonly allConnection: Layer.SockList = new Layer.SockList();
    constructor() {
        this.events = baseEvent.clone();
        // now we choose gain event for string or Uint8Array
        this.flow = new Flow(
            [
                [isPrimitive('string'), this.events.onMessage],
                [isWebSocketPingEvent, this.events.onPing],
                [isWebSocketPongEvent, this.events.onPong],
                [isWebSocketCloseEvent, this.events.onDisconnect],
                [hasInstance(Uint8Array), this.events.onBinary]
            ]
        );
    }
    async attach(request: ServerRequest) {
        const {conn, headers, r, w,} = request;
        const socket = await acceptWebSocket({
            conn,
            headers,
            bufReader: r,
            bufWriter: w,
        });
        
        this.connection[Layer.defaultSockKey][Layer.defaultSockKey].push(socket);
        this.allConnection.push(socket);
        
        await this.flow.eval(this.events.onConnect);
        for await (const ev of socket.receive()) {
            try {
                await this.flow.exec(ev);
            } catch (e) {
                await socket.close(1000).catch(console.error);
            }
        }
        return this;
    }   
    hasEvent() {

    }
    _addEvent(eventName: string, ...handlers: Base.SockHandleArray) {
        const {events} = this;
        if (!(eventName in events)) {
            throw new Error(`not exist event [eventName: ${eventName}]`);
        }
        events[eventName].push(...handlers);
    }
    _addCustomEvent(cond: Cond, eventName: string, ...handlers: Base.SockHandleArray) {
        const currentEvent: Base.SockHandleArray = this.events[eventName] = [];
        this.flow.add(cond, ...currentEvent);
        this._addEvent(eventName, ...handlers);
    }
    attachEvent() {

    }
}