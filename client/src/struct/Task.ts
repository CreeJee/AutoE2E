import { Primitive } from "./Base";

export type DelayTaskFunction<T> = (current: T) => Promise<void>;
export interface TaskMethod<T>{
    focus(): DelayTaskFunction<T>;
    focusOut(): DelayTaskFunction<T>;
    click(): DelayTaskFunction<T>;
    doubleClick(): DelayTaskFunction<T>;
    mouseEnter(isOver: boolean): DelayTaskFunction<T>;
    mouseLeave(): DelayTaskFunction<T>;
    resize(width: Number, height: Number): DelayTaskFunction<T>;
    // zoom(ratio: Number): Promise<IComponentEvent>
    keyDown(keyCode: Number): DelayTaskFunction<T>;
    keyUp(keyCode: Number): DelayTaskFunction<T>;
    keyPress(keyCode: Number): DelayTaskFunction<T>;
}
export type DocNode = {
    children: DocNode[];
    [x: string]: Primitive;
}