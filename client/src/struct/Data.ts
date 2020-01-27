import { ColorType, Primitive } from './Base';
export * from './Base'
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
    type: ColorType;
    message: string;
}
export interface IDocumentNode {
    children: IDocumentNode[];
    uid: number;
    name: string;
}
export interface IProperty {
}
export interface ITask<T> {
    current: T,
    task: string,
    param: Primitive[] 
}
