// eslint-disable-next-line no-unused-vars
import { ISockEvent, Sock, DisconnectEvent } from '../lib/BetterWS/mod.ts'
import { basename, extname, resolve } from '../deps.ts'
/// <reference types="graphql" />
import graphql from './dist/graphql.js'
import { readFile as justRead, duplicatedKeys } from '../base/util.ts'
type PluginsResolver = {
    [key in string]: any
}
type moduleMockType = {
    [k in string]: any
}
// eslint-disable-next-line no-undef
const { readDir } = Deno
async function resolveModule (path: string) : Promise<moduleMockType> {
    const temp : moduleMockType = {}
    const dirList = await readDir(path);
    (
        await Promise.all(
            dirList
                .filter((file: Deno.FileInfo) => file.isFile())
                .map((file: Deno.FileInfo) => import(`${path}/${file.name}`))
        )
    ).reduce(
        (accr, moduleObj: moduleMockType, nth) => {
            const fileName = dirList[nth].name
            const event = basename(fileName, extname(fileName))
            const moduleFn = moduleObj.default
            const moduleKeys = duplicatedKeys(accr, moduleFn)
            // accr[event] = moduleObj.default
            if (moduleKeys.length > 0) {
                throw new Error(`duplicate keys: [${moduleKeys.join(',')}] path: ${path}`)
            }
            Object.assign(accr, moduleFn)
            return accr
        },
        temp
    )
    return temp
}

const currentFolder = import.meta.url.split('/').slice(-2, -1)[0]
/**
 *
          argsOrSchema,
          source,
          rootValue,
          contextValue,
          variableValues,
          operationName,
          fieldResolver,
          typeResolver
 */
const schema = await justRead(resolve(`./${currentFolder}`, './schema/index.graphql'))
const rootValue: PluginsResolver = resolveModule(resolve(`./${currentFolder}`, './resolver'))
const typeResolver: PluginsResolver = resolveModule(resolve(`./${currentFolder}`, './type'))

// TODO : divied graphQL payload
export class SocketRunner implements ISockEvent {
    async onMessage (socket:Sock, event: string, data: string): Promise<void> {
    // just hook, whatever
        if (event === 'graphQL') {
            const result = await graphql.graphql({
                schema,
                source: data,
                rootValue,
                // contextValue: contextValue,
                // variableValues: variableValues,
                // operationName: operationName,
                // fieldResolver: fieldResolver,
                typeResolver
            })
            socket.send(event, JSON.stringify(result))
        }
    }
}
