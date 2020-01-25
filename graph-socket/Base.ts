import { ISockEvent, Sock, DisconnectEvent } from "../lib/BetterWS/mod.ts";
import  { basename, extname, resolve } from "../deps.ts";
/// <reference types="graphql" />
import graphql from "./dist/graphql.js";
import {readFile as justRead} from "../base/util.ts"

import { createRequire } from "https://deno.land/std/node/module.ts";
// const require_ = createRequire(import.meta.url);
// const GraphQL = require_("graphql");
// const {makeExecutableSchema, IResolvers} = require_("graphql-tools");


// type PluginsHandler = (data: string) => Promise<void>;
// type PluginsMapper = {
//     [key in string]: PluginsHandler
// }
// type PluginsResolver = IResolvers<string, PluginsMapper>
type PluginsResolver = {
    [key in string]: any
}
const { readDir } = Deno;


const basePath = './resolver';
const currentFolder = import.meta.url.split("/").slice(-2,-1)[0];
const dirList = await readDir(resolve(`./${currentFolder}`,`${basePath}`));
const typeDefs = await justRead(resolve(`./${currentFolder}`,`./scheme/index.graphql`))
const resolvers: PluginsResolver = {};
{
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
            // accr[event] = moduleObj.default;
            Object.assign(accr, moduleObj.default);
            return accr;
        },
        resolvers
    );
}
const schema =  graphql.buildSchema(typeDefs);
console.log(typeDefs, resolvers);
//TODO : divied graphQL payload
export class SocketRunner implements ISockEvent{
    async onMessage (socket:Sock, event: string, data: string): Promise<void> {
        if(event === 'graphql') {
            console.log(data);
            const result = await graphql.graphql(schema, data, resolvers);
            socket.send(JSON.stringify(result));
        }
    }
}