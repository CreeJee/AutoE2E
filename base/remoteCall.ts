import * as WSType from '../lib/BetterWS/type.ts';
export interface IComponentHandler{
    onFocusIn(): Promise<void>
    onFocusOut(): Promise<void>
    onClick(): Promise<void>
    onDoubleClick(): Promise<void>
    onMouseOver(): Promise<void>
    onMouseEnter(): Promise<void>
    onMouseLeave(): Promise<void>
    onResize(): Promise<void>
    onKeyDown(keyCode: Number): Promise<void>
    onKeyUp(keyCode: Number): Promise<void>
    onKeyPress(keyCode: Number): Promise<void>
}
export interface IComponentEvent {
    focus(): Promise<void>
    focusOut(): Promise<void>
    click(): Promise<void>
    doubleClick(): Promise<void>
    mouseEnter(isOver: boolean): Promise<void>
    mouseLeave(): Promise<void>
    onResize(width: Number, height: Number): Promise<void>
    keyDown(keyCode: Number): Promise<void>
    keyUp(keyCode: Number): Promise<void>
    keyPress(keyCode: Number): Promise<void>
}