import * as deps from './deps.ts'
import { WebSocketMessage, WebSocket } from './deps.ts'
import { Sock, SockMessage } from './socket.ts'
export const defaultSockKey = 'default'
export class Group {
    protected groups: Sock[] = new Array<Sock>();
    constructor (...items) {
      this.groups.push(...items)
    }

    async sendAll (data: SockMessage): Promise<void> {
      for await (const socket of this.groups) {
        await socket.send(data)
      }
    }

    async sendTo (socket: Sock, data: SockMessage): Promise<Sock> {
      const groups = this.groups
      let current: Sock = null
      if (!groups.includes(socket)) {
        throw new Error('socket is must joined')
      }
      current = groups[groups.indexOf(socket)]
      await current.send(data)
      return current
    }

    async join (socket: Sock): Promise<void> {
      if (this.groups.includes(socket)) {
        throw new Error('socket is alreay joined')
      };
      this.groups.push(socket)
    }

    async leave (socket: Sock): Promise<void> {
      if (!this.groups.includes(socket)) {
        throw new Error('socket is Must join room')
      }
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
