import * as WSType from '../lib/BetterWS/type.ts';
import { Task } from './Task.ts';
export interface IComponentHandler{
    onFocusIn(): Promise<void>;
    onFocusOut(): Promise<void>;
    onClick(): Promise<void>;
    onDoubleClick(): Promise<void>;
    onMouseOver(): Promise<void>;
    onMouseEnter(): Promise<void>;
    onMouseLeave(): Promise<void>;
    onResize(): Promise<void>;
    // onZoom(ratio: Number): Promise<void>
    onKeyDown(keyCode: Number): Promise<void>;
    onKeyUp(keyCode: Number): Promise<void>;
    onKeyPress(keyCode: Number): Promise<void>;
}
export interface IComponentEvent {
    focus(): Promise<IComponentEvent>;
    focusOut(): Promise<IComponentEvent>;
    click(): Promise<IComponentEvent>;
    doubleClick(): Promise<IComponentEvent>;
    mouseEnter(isOver: boolean): Promise<IComponentEvent>;
    mouseLeave(): Promise<IComponentEvent>;
    resize(width: Number, height: Number): Promise<IComponentEvent>;
    // zoom(ratio: Number): Promise<IComponentEvent>
    keyDown(keyCode: Number): Promise<IComponentEvent>;
    keyUp(keyCode: Number): Promise<IComponentEvent>;
    keyPress(keyCode: Number): Promise<IComponentEvent>;
}
abstract class Node {
    constructor(){
        // register node from Node Manager

    }
    private tag: String;

} 
abstract class Window {
    async init() {
        // client connect
        // accept connection & request wrapper app with project UID
        // request layout tree
        // parse layout tree
        // observing event
    }
    start(task: Task) {
        
    }

}
abstract class Receiver {
    
}