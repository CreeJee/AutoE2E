import { IAdapter } from 'src/struct/Interface/SockAdapter';
import { Instance as wsAdapter } from './Adapter/Socket/WebSocket';

export let Instance: IAdapter = wsAdapter;
export function use(adapter: IAdapter) {
    Instance = adapter;
}