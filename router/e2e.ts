
import {Context} from "https://deno.land/x/oak/context.ts";
import { BetterWS } from '../lib/BetterWS/mod.ts';
import { Router, Application } from "https://deno.land/x/oak/mod.ts";
const ws = new BetterWS({});
export const handler = (router: Router, app: Application) => {
    app.use(
        async (ctx: Context, next) => {
            try{
                await next();
                await ws.attach(ctx.request.serverRequest);
            }
            catch(e) {
                console.error(e);
            }
        }
    );
    router.get('/', async (ctx: Context) => {
        console.log(!ctx.request.headers.get('upgrade'));
        ctx.response.body = 'e2e';
    });
}
export default handler;