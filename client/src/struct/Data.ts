import * as Base from './Base'
export type TaskState = {
    name: string, 
}
export enum TagEnum{
    SUCCESS = 0,
    WARN = -1,
    TEST_ERROR = -2,

    UNKNOWN_ERR = -999,
} 
export type TagState = {
    name: string,
    type: Base.ColorType,
    message: string,
}