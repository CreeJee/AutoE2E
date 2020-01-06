
import {Flow, isPrimitive, hasInstance, FlowHandlers, Cond} from "./flow.ts";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    isWebSocketPongEvent,
    WebSocket,
    ServerRequest
} from './deps.ts';
import * as Base from './type.ts'
import * as Layer from './layer.ts'
import {baseEvent} from './event.ts';
import { Sock } from "./socket.ts";
type onMessageQueue = Base.HandleArray<Base.onMessageHandler>;

const MESSAGE_PAYLOAD_DELIMITER = ':';
const _messageWrapper = (fn: Function) => (sock: Sock, msg: Base.SockMessage): boolean => {
    return fn(msg);
}
const _channelHook = (flow: Flow, eventList: onMessageQueue) :onMessageQueue => {
    const refHandler = async (sock: Sock, msg: string) => {
        if (msg.includes(MESSAGE_PAYLOAD_DELIMITER)) {
            const delimiterPos = msg.indexOf(MESSAGE_PAYLOAD_DELIMITER);
            const eventName = msg.slice(0, delimiterPos);
            const payload = msg.slice(delimiterPos+1);
            return flow.eval(eventList, sock, eventName, payload);
        } else {
            // global message or error
        }
    }
    return [refHandler];
}
export class BetterWS {
    private flow: Flow;
    readonly events: Base.WSEventList;
    readonly allConnection: Layer.Group = new Layer.Group();
    constructor({
        events = baseEvent.extract()
    }) {
        this.events = events;
        // now we choose gain event for string or Uint8Array
        this.flow = new Flow(
            [
                [_messageWrapper(isPrimitive('string')), _channelHook(this.flow, this.events.onMessage)],
                [_messageWrapper(isWebSocketPingEvent), this.events.onPing],
                [_messageWrapper(isWebSocketPongEvent), this.events.onPong],
                [_messageWrapper(isWebSocketCloseEvent), this.events.onDisconnect],
                [_messageWrapper(hasInstance(Uint8Array)), this.events.onBinary]
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
        const sock: Sock = new Sock(socket);
        this.allConnection.join(sock);
        
        await this.flow.eval(this.events.onConnect, sock, '');
        for await (const ev of socket.receive()) {
            try {
                await this.flow.exec(sock, ev);
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