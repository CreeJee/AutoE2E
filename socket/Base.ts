import { ISockEvent, Sock, DisconnectEvent } from "../lib/BetterWS/mod";
import  { basename, extname } from "../deps.ts";
type PluginsHandler = (socket: Sock, data: string) => Promise<void>;

const basePath = './messageEvent';
const { readDir } = Deno;
const dirList = await readDir(basePath);
const pluginsMapper : Map<string, PluginsHandler> = (
    await Promise.all(
        dirList.filter(
            (file: Deno.FileInfo) => file.isFile()
        ).map(
            (file: Deno.FileInfo) => import(`${basePath}/${file.name}`)
        )
    )
).reduce(
    (accr, moduleObj, nth) => {
        const fileName = dirList[nth].name;
        const event = basename(fileName,extname(fileName));
        accr.set(event,moduleObj.default);
        return accr;
    },
    new Map()
);

export class DocumentTree implements ISockEvent{
    async onConnect (socket: Sock, data: string): Promise<void> {

    }
    async onMessage (socket:Sock, event: string, data: string): Promise<void> {
        const handler = pluginsMapper.get(event);
        if(typeof handler === 'function') {
            await handler(socket, data);
        }

    }
    async onDisconnect(socket: Sock, data: DisconnectEvent): Promise<void> {
      
    }
  }