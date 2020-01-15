import * as Base from './Base';
export interface ITaskState {
    name: string;
}
export interface ITagState {
    name: string;
    type: Base.ColorType;
    message: string;
}
export enum TagEnum {
    SUCCESS = 0,
    WARN = -1,
    TEST_ERROR = -2,

    UNKNOWN_ERR = -999,
}
