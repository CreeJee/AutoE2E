import { Sock } from "./socket.ts";
import { WebSocketMessage, WebSocketCloseEvent, WebSocketPongEvent, WebSocketPingEvent } from "./mod.ts";
export type PingEvent = WebSocketPingEvent;
export type PongEvent = WebSocketPongEvent;
export type DisconnectEvent = WebSocketCloseEvent

export type SockMessage = WebSocketMessage;
export type SockEvent = SockMessage | PingEvent | PongEvent | DisconnectEvent;
export type SockHandle = (sock:Sock, data: SockEvent) => Promise<void>;
export type HandleArray<T extends SockHandle> =  T[] | [];
export type SockHandleArray = HandleArray<SockHandle>;

export type onMessageHandler = (sock: Sock, data: string) => Promise<void>;
export type onConnectHandler = (sock: Sock, data: string) => Promise<void>;
export type onPingHandler = (sock: Sock, data: PingEvent) => Promise<void>;
export type onPongHandler = (sock: Sock, data: PongEvent) => Promise<void>;
export type onDisconnectHandler = (sock: Sock, data: DisconnectEvent) => Promise<void>;
export type onBinaryHandler = (sock: Sock, data: Uint8Array) => Promise<void>;


export type SockEventType = {
    onMessage?: onMessageHandler,
    onConnect?: onConnectHandler,
    onPing?: onPingHandler,
    onPong?: onPongHandler,
    onDisconnect?: onDisconnectHandler,
    onBinary?: onBinaryHandler
}
export type WSEventList = {
    onMessage: HandleArray<onMessageHandler>,
    onConnect: HandleArray<onConnectHandler>,
    onPing: HandleArray<onPingHandler>,
    onPong: HandleArray<onPongHandler>,
    onDisconnect: HandleArray<onDisconnectHandler>,
    onBinary: HandleArray<onBinaryHandler>
}
// export type SockHandleType = SockHandleOptionalGroup<SockHandle>
// export type WSEventList = SockHandleGroup<SockHandleArray> & {
//     // [k: string]: SockHandleArray,
// }

export interface ISockEvent extends SockEventType {
    onMessage?(sock: Sock, data: string): Promise<void>;
    onConnect?(sock: Sock, data: string): Promise<void>;
    onPing?(sock: Sock, data: PingEvent): Promise<void>;
    onPong?(sock: Sock, data: PongEvent): Promise<void>;
    onDisconnect?(sock: Sock, data: DisconnectEvent): Promise<void>;
    onBinary?(sock: Sock, data: Uint8Array): Promise<void>;
}