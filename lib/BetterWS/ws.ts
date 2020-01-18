
import {Flow, isPrimitive, hasInstance, FlowHandlers, Cond} from "./flow.ts";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    isWebSocketPongEvent,
    WebSocket,
    ServerRequest,
    serve
} from './deps.ts';
import * as Base from './type.ts'
import * as Layer from './layer.ts'
import {baseEvent} from './event.ts';
import { Sock, ISocket } from "./socket.ts";
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
const _findSocketRequest = function(request: ServerRequest){
  return (item: ISocket) => item.serverRequest === request ? item : undefined;
}
export class BetterWS {
    private flow: Flow;
    readonly events: Base.WSEventList;
    readonly all: Layer.Group = new Layer.Group();
    constructor({
        events = baseEvent.extract()
    }) {
        this.events = events;
        // now we choose gain event for string or Uint8Array
        this.flow = new Flow(
            [
                [_messageWrapper(isWebSocketPingEvent), this.events.onPing],
                [_messageWrapper(isWebSocketPongEvent), this.events.onPong],
                [_messageWrapper(isWebSocketCloseEvent), this.events.onDisconnect],
                [_messageWrapper(hasInstance(Uint8Array)), this.events.onBinary]
            ]
        );
        this.flow.add(_messageWrapper(isPrimitive('string')), _channelHook(this.flow, this.events.onMessage));
    }
    async attach(request: ServerRequest) {
        const connectionGroup = this.all;
        const socket: ISocket = new Sock(request);
        await socket.init();
        await this.flow.eval(this.events.onConnect, socket, '');
        connectionGroup.join(socket);
        try{
            const  sockMessage = socket.originalSock.receive();
            while(true) {
                const {done, value} = await sockMessage.next();
                if(done) {
                    break;
                }
                await this.flow.exec(socket, value);
            }
        } 
        catch (e) {
            await socket.close({code: 3000}).catch(console.error);
        }
        return this;
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
        this.flow.add(cond, currentEvent);
        this._addEvent(eventName, ...handlers);
    }
    attachEvent() {

    }
    async serve(address) {
        for await (const req of serve(address)) {
            try{
                this.attach(req);
            } catch(e) {
                this.onError(req, e)
            }
        }
    }
    onError(req: ServerRequest, err: Error) {
        const response = new Response('need websocket', 200,[], req.conn.rid, false);
        req.respond(response);
    }
}