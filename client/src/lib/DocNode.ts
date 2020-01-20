import { Primitive } from '../struct/Base';
import { IDocumentNode } from '../struct/Data';
import { AdapterHandler, IResponseType } from '../struct/Interface/SockAdapter';
import { DelayTaskFunction, ITaskMethod } from '../struct/Task';
import { Instance as adapter} from './Socket';
import { useAdapterState } from 'src/hooks/useAdapter';
const EVENT_NAME = 'DocumentTree';

type ResponseNode = IResponseType<DocNode>;
export type HandlerType = AdapterHandler<ResponseNode>;
function sendImplents<T>(task: string, ...param: Primitive[]): DelayTaskFunction<T> {
    return async (current: T) => {
        return adapter.send({ key: EVENT_NAME, data: {current, task, param}});
    };
}

export let sendOverride = sendImplents;
export class DocNode implements IDocumentNode{
    public children: DocNode[] = [];
    public uid: number = NaN;
    public name: string = '';
    constructor(uid: number, ...children: DocNode[]) {
        this.uid = uid;
        this.children.push(...children);
    }
    public async exec(): Promise<void> {
        // const result = Promise.all(tasks.map(v => v(this)));
    }
    static useState(){
        return useAdapterState<DocNode>(EVENT_NAME, new DocNode(0));
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
        return sendOverride<DocNode>('mouseEnter', isOver);
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
