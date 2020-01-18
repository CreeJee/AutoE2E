import {Context} from "https://deno.land/x/oak/context.ts";
import { Router, Application } from "https://deno.land/x/oak/mod.ts";
export const handler = (router: Router, app: Application) => {
    router.get('/', async (ctx: Context) => {
    });
}
export default handler;