import { Sock } from '../socket.ts'
import { ISockEvent } from '../type.ts';
// TODO: what event name
// & type diff for each handler for data : complete

export default class Echo implements ISockEvent {
  async onConnect (socket: Sock, data: string): Promise<void> {
    console.log('onConnected');
    return socket.send('hello?');
  }
  async onMessage (socket:Sock, event: string, data: string): Promise<void> {
    return socket.send(`echo test[${event}:${data}]`);
  };
}
