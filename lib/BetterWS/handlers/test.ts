import { SockHandleType } from '../type.ts'
import { WebSocketEvent } from '../deps.ts'
import { Sock } from '../socket.ts'
import { SockEvent } from '../type.ts'

export default class Echo extends SockEvent {
  onMessage (socket:Sock, data: WebSocketEvent): Promise<void> {
    return socket.send('echo response');
  };
}
