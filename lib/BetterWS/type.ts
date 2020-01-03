import { Sock, SockMessage } from "./socket.ts";

export type SockHandle = (sock:Sock, v?: SockMessage) => Promise<void>;
export type SockHandleArray =  SockHandle[] | [];
export type SockHandleOptionalGroup<T> = {
    onMessage?: T,
    onConnect?: T,
    onPing?: T,
    onPong?: T,
    onDisconnect?: T,
    onBinary?: T
}
export type SockHandleGroup<T> = {
    onMessage: T,
    onConnect: T,
    onPing: T,
    onPong: T,
    onDisconnect: T,
    onBinary: T
}
export type SockHandleType = SockHandleOptionalGroup<SockHandle>
export type WSEventList = SockHandleGroup<SockHandleArray> & {
    // [k: string]: SockHandleArray,
}

export abstract class SockEvent implements SockHandleType {} 