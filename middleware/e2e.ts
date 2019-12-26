
import {Context} from "https://deno.land/x/oak/context.ts";
import {BetterWS} from '../lib/BetterWS';

const ws = new BetterWS();
export const handler = (router) => {
    router.get('/e2e', async (ctx: Context) => {
        ctx.response.body = 'e2e';
        
        const {serverRequest} = ctx.request;
        try{
            await ws.attach(serverRequest);
        }
        catch (e) {
            
        }
    });
}
export default handler;