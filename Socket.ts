
import { BetterWS } from './lib/BetterWS/mod.ts';
const ws = new BetterWS({});
console.log('server open on :8080');
ws.serve(':8080');