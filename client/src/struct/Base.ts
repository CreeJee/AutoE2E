
export enum ColorType {
    'WARN' = 'yellow',
    'DANGER' = 'red',
    'INFO' = 'blue',
}
export type Primitive = string | number | boolean | object | Primitive[];
export type DelayTaskFunction<T> = (current: T) => Promise<void>;
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