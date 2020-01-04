import { Sock } from '../socket.ts'
import { SockEvent } from '../type.ts'
import { SockBaseEvent } from '../event.ts'
// TODO: what event name
// & type diff for each handler for data : complete

export default class Echo extends SockBaseEvent {
  onMessage (socket:Sock, data: string): Promise<void> {
    return socket.send('echo response');
  };
}
