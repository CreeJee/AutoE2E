import { BetterWS, ISockEvent, Sock, DisconnectEvent } from './lib/BetterWS/mod.ts';
import {SocketRunner} from './graph-socket/Base.ts';
const ws = new BetterWS({});
ws.addEventListener(SocketRunner);
console.log('server open on :8080');
ws.serve(':8080');