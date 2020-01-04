import {Context} from "https://deno.land/x/oak/context.ts";
import { BetterWS } from '../lib/BetterWS/mod.ts';
import { Router, Application } from "https://deno.land/x/oak/mod.ts";
const ws = new BetterWS({});
export const handler = (router: Router, app: Application) => {
    router.get('/', async (ctx: Context) => {
        console.log('connected');
        try{
            await ws.attach(ctx.request.serverRequest);
        }
        catch(e) {
            console.error(e);
            ctx.response.body = 'need websocket';
        }
    });
}
export default handler;