import { Primitive } from '../struct/Base';
import { ILoadable } from '../struct/Interface/Loadable';
import { DelayTaskFunction, ITaskMethod } from '../struct/Task';
import { Instance as adapter} from './Socket';
function sendImplents<T>(task: string, ...param: Primitive[]): DelayTaskFunction<T> {
    return async (current: T) => {
        return adapter.send({ key: 'task', data: {current, task, param}});
    };
}
export let sendOverride = sendImplents;
export class DocNode implements ILoadable<DocNode>{
    public children: DocNode[] = [];
    public uid: number = NaN;
    public name: string = '';
    constructor(uid: number, ...children: DocNode[]) {
        this.uid = uid;
        this.children.push(...children);
    }
    public async exec(...tasks: Array<DelayTaskFunction<DocNode>>): Promise<void> {
        // const result = Promise.all(tasks.map(v => v(this)));
    }
    public async load():Promise<DocNode> {
        const response = await adapter.get('taskQueue', true);
        return response.data as DocNode;
    }
    // public _load(obj: object) {}
}
export const TaskList: ITaskMethod<DocNode> = {
    focus() {
        return sendOverride<DocNode>('focus');
    },
    focusOut() {
        return sendOverride<DocNode>('focusOut');
    },
    click() {
        return sendOverride<DocNode>('click');
    },
    doubleClick() {
        return sendOverride<DocNode>('doubleClick');
    },
    mouseEnter(isOver: boolean) {
        return sendOverride<DocNode>('mouseEnter');
    },
    mouseLeave() {
        return sendOverride<DocNode>('mouseLeave');
    },
    resize(width: number, height: number) {
        return sendOverride<DocNode>('resize', width, height);
    },
    // zoom(ratio: Number): Promise<IComponentEvent>
    keyDown(keyCode: number) {
        return sendOverride<DocNode>('keyDown', keyCode);
    },
    keyUp(keyCode: number) {
        return sendOverride<DocNode>('keyUp', keyCode);
    },
    keyPress(keyCode: number) {
        return sendOverride<DocNode>('keyPress', keyCode);
    },
};
