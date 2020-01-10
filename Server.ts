
const { readDir } = Deno;
import  { basename, extname, resolve } from "./deps.ts";
import { Application, Router, send as useStatic } from "https://deno.land/x/oak/mod.ts";

import { server, moduleDir } from './Config.ts';
// Require the framework and instantiate it
const app = new Application();
async function run() {
    // Run the server!
    try {
        for await (const {name} of await readDir(moduleDir)) {
            const route = (await import(`${moduleDir}/${name}`)).default;
            const prefix = `/${basename(name, extname(name))}`;
            const router = new Router(prefix === '/index' ? {} : {prefix});
            if (typeof route !== 'function') { 
                throw new Error('router dir module is must function');
            }
            await route(router, app);
            app.use(router.routes());
            app.use(router.allowedMethods());
            app.use(
                async (context, next) => {
                    try{
                        await useStatic(context, context.request.path, {
                            root: `${Deno.cwd()}/client/build`,
                            format: true,
                            index: "index.html"
                        });
                    }
                    catch(e) {
                        await next();
                    }
                }
            );
        }
        console.log(`server start on ${server.address}`)
        await app.listen(server.address);
    } catch (err) {
        console.error(err);
    }
}
run()