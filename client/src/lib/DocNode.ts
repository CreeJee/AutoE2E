import {DelayTaskFunction, TaskMethod} from '../struct/Task';
import { Primitive } from "../struct/Base";
import { Instance as WsAdapter} from "./WebSocket";
function sendImplents<T>(task: string, ...param: Primitive[]) : DelayTaskFunction<T>{
    return async (current: T) => {
        return WsAdapter.send({current, task, param});
    }
}
export let sendOverride = sendImplents;
export class DocNode{
    children: DocNode[] = [];
    uid: Number = NaN;
    constructor(uid: number, ...children: DocNode[]) {
        this.uid = uid;
        this.children.push(...children);
    }
    async exec( ...tasks: DelayTaskFunction<DocNode>[] ) : Promise<void>{
        // const result = Promise.all(tasks.map(v => v(this)));
    }
    async load() {
        return WsAdapter.get('taskQueue');
    }
    _load(obj: object) {
        
    }
}
export const TaskList: TaskMethod<DocNode> = {
    focus() { 
        return sendOverride<DocNode>('focus');
    },
    focusOut(){
        return sendOverride<DocNode>('focusOut')
    },
    click(){
        return sendOverride<DocNode>('click')
    },
    doubleClick(){
        return sendOverride<DocNode>('doubleClick')
    },
    mouseEnter(isOver: boolean){
        return sendOverride<DocNode>('mouseEnter')
    },
    mouseLeave(){
        return sendOverride<DocNode>('mouseLeave')
    },
    resize(width: number, height: number){
        return sendOverride<DocNode>('resize', width, height)
    },
    // zoom(ratio: Number): Promise<IComponentEvent>
    keyDown(keyCode: number){
        return sendOverride<DocNode>('keyDown', keyCode)
    },
    keyUp(keyCode: Number){
        return sendOverride<DocNode>('keyUp', keyCode)
    },
    keyPress(keyCode: Number){
        return sendOverride<DocNode>('keyPress', keyCode)
    },
}