export const decoder = new TextDecoder("utf-8");
export async function readFile(path: string){
    return decoder.decode(await Deno.readFile(path));
}