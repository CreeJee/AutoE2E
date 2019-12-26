
import {Flow, isPrimitive, hasInstance, FlowHandlers, Cond} from "./Flow";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    isWebSocketPongEvent,
    WebSocket,
    WebSocketEvent,
    ServerRequest
} from "../deps.ts";

export type WSEventList = {
    [k: string]: FlowHandlers,
    onMessage: FlowHandlers,
    onConnect: FlowHandlers,
    onPing: FlowHandlers,
    onPong: FlowHandlers,
    onDisconnect: FlowHandlers,
    onBinary: FlowHandlers
}
export class BetterWS {
    private _socket: WebSocket;
    private _flow: Flow;
    readonly request: ServerRequest;
    readonly events: WSEventList;

    constructor() {
        this.events = {
            onMessage: [],
            onPing: [],
            onPong: [],
            onConnect: [],
            onDisconnect: [],
            onBinary: [],
        }
        // now we choose gain event for string or Uint8Array
        this._flow = new Flow(
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
        await this._flow.eval(this.events.onConnect);
        for await (const ev of socket.receive()) {
            try {
                this._flow.exec(ev);
            } catch (e) {
                await socket.close(1000).catch(console.error);
            }
        }
        return socket;
    }
    hasEvent() {

    }
    addEvent(eventName: string, ...handlers: FlowHandlers) {
        const {events, _flow} = this;
        if (!(eventName in events)) {
            throw new Error(`not exist event [eventName: ${eventName}]`);
        }
        events[eventName].push(...handlers);
    }
    addCustomEvent(cond: Cond, eventName: string, ...handlers: FlowHandlers) {
        const currentEvent: FlowHandlers = this.events[eventName] = [];
        this._flow.add(cond, ...currentEvent)
        this.addEvent(eventName, ...handlers);
    }
}