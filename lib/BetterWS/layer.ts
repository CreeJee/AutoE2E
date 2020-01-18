import * as deps from './deps.ts'
import { WebSocketMessage, WebSocket, ServerRequest } from './deps.ts'
import { Sock, ISocket } from './socket.ts'
import { SockMessage, } from './type.ts';

export const defaultSockKey = 'default';
export class Group<T extends ISocket = ISocket> {
    public readonly groups: T[] = new Array<T>();
    constructor (...items) {
      this.groups.push(...items)
    }

    async sendAll (data: SockMessage): Promise<void> {
      for await (const socket of this.groups) {
        await socket.send(data)
      }
    }

    async sendTo (socket: T, data: SockMessage): Promise<T> {
      const groups = this.groups
      let current: T = null
      if (!groups.includes(socket)) {
        throw new Error('socket is must joined')
      }
      current = groups[groups.indexOf(socket)]
      await current.send(data)
      return current
    }

    async join (socket: T): Promise<void> {
      if (this.groups.includes(socket)) {
        throw new Error('socket is alreay joined')
      };
      this.groups.push(socket)
    }

    async leave (socket: T): Promise<void> {
      if (!this.groups.includes(socket)) {
        throw new Error('socket is Must join room')
      }
      this.groups.splice(this.groups.indexOf(socket),1);
      await socket.close({code: 1000});
    }
};
export abstract class Layer<T> extends Map<string, T> {
  createOrGet (key, Construct: {new(): T}) {
    if (!this.has(key)) {
      this.set(key, new Construct())
    }
    return this.get(key)
  }

  constructor (ConstructT: {new(): T}) {
    super()

    this.createOrGet(defaultSockKey, ConstructT)
    return new Proxy(this, {
      get (target, k) {
        if (k in target) {
          return Reflect.get(target, k).bind(target)
        } else {
          return target.get(k.toString())
        }
      }
    })
  }
}
