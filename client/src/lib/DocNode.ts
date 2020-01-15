import { Primitive } from '../struct/Base';
import { DelayTaskFunction, ITaskMethod } from '../struct/Task';
import { Instance as WsAdapter} from './WebSocket';
function sendImplents<T>(task: string, ...param: Primitive[]): DelayTaskFunction<T> {
    return async (current: T) => {
        return WsAdapter.send({ key: 'task', data: {current, task, param}});
    };
}
export let sendOverride = sendImplents;
export class DocNode {
    public children: DocNode[] = [];
    public uid: number = NaN;
    constructor(uid: number, ...children: DocNode[]) {
        this.uid = uid;
        this.children.push(...children);
    }
    public async exec(...tasks: Array<DelayTaskFunction<DocNode>>): Promise<void> {
        // const result = Promise.all(tasks.map(v => v(this)));
    }
    public async load() {
        return WsAdapter.get('taskQueue');
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
