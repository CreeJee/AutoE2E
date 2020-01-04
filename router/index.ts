
import {Context} from "https://deno.land/x/oak/context.ts";
export const handler = (router) => {
    router.get('/', async (ctx: Context) => {
        ctx.response.body = '~Heartbeat';
    });
}
export default handler;