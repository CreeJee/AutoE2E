import { ISockEvent, Sock, DisconnectEvent } from "../lib/BetterWS/mod.ts";
import  { basename, extname, resolve } from "../deps.ts";
type PluginsHandler = (socket: Sock, data: string) => Promise<void>;

const { readDir } = Deno;


const basePath = './OnMessage';
const dir = resolve('./socket',`${basePath}`);
const dirList = await readDir(dir);
const pluginsMapper : Map<string, PluginsHandler> = new Map<string, PluginsHandler>();
(
    await Promise.all(
        dirList.filter(
            (file: Deno.FileInfo) => file.isFile()
        ).map(
            (file: Deno.FileInfo) => {
                const path = `${basePath}/${file.name}`;
                return import(path)             
            }
        )
    )
).reduce(
    (accr, moduleObj, nth) => {
        const fileName = dirList[nth].name;
        const event = basename(fileName,extname(fileName));
        accr.set(event,moduleObj.default);
        return accr;
    },
    pluginsMapper
);

export class SocketRunner implements ISockEvent{
    async onMessage (socket:Sock, event: string, data: string): Promise<void> {
        const handler = pluginsMapper.get(event);
        if(typeof handler === 'function') {
            await handler(socket, data);
        }

    }
}