export const decoder = new TextDecoder('utf-8')
export async function readFile (path: string) {
  return decoder.decode(await Deno.readFile(path))
}
export function duplicatedKeys (obj1: object, obj2: object): Array<any> {
  return [...new Set([].concat(Object.keys(obj1), Object.keys(obj2)))]
}
