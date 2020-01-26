import * as Base from './Base';
export type DelayTaskFunction<T> = (current: T) => Promise<void>;
export enum TagEnum {
    SUCCESS = 0,
    WARN = -1,
    TEST_ERROR = -2,
    UNKNOWN_ERR = -999,
}
export interface IDocNode {
    children: IDocNode[];
}

export interface IItemState {
    name: string;
}
export interface ITagState {
    name: string;
    type: Base.ColorType;
    message: string;
}
export interface IDocumentNode {
    children: IDocumentNode[];
    uid: number;
    name: string;
}
export interface IProperty {
}


export interface ITaskMethod<T> {
    focus(): DelayTaskFunction<T>;
    focusOut(): DelayTaskFunction<T>;
    click(): DelayTaskFunction<T>;
    doubleClick(): DelayTaskFunction<T>;
    mouseEnter(isOver: boolean): DelayTaskFunction<T>;
    mouseLeave(): DelayTaskFunction<T>;
    resize(width: number, height: number): DelayTaskFunction<T>;
    // zoom(ratio: number): Promise<IComponentEvent>
    keyDown(keyCode: number): DelayTaskFunction<T>;
    keyUp(keyCode: number): DelayTaskFunction<T>;
    keyPress(keyCode: number): DelayTaskFunction<T>;
}
export interface ITask<T> {
    current: T,
    task: string,
    param: Base.Primitive[] 
}
