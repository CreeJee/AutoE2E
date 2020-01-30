import { Primitive } from '../struct/Base';
import { IDocumentNode, ITaskMethod, ITask, DelayTaskFunction } from '../struct/Data';
import { AdapterHandler, IResponseType } from '../struct/Interface/SockAdapter';
import { Instance as adapter} from './Socket';
import { useGqlState, gqlDispatch } from 'src/hooks/useAdapter';
export type ResponseNode = IResponseType<DocNode>;
export type HandlerType = AdapterHandler<ResponseNode>;

const EVENT_NAME = 'Window';
const GET_QUERY = `query {
    
}`;
const SEND_OVERRIDE_QUERY = `mutation {

}`;
export function sendOverride<T>(task: string, ...param: Primitive[]): DelayTaskFunction<T> {
    return async (current: T) => {
        gqlDispatch(EVENT_NAME,SEND_OVERRIDE_QUERY)
        return adapter.send<IResponseType<ITask<T>>>({key:EVENT_NAME, data: {current, task, param}});
    };
}
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
        return useGqlState<DocNode>(EVENT_NAME, GET_QUERY,new DocNode(0));
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
