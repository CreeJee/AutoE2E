export interface IResponseType {
    key: string;
    data: object;
}
export interface IAdapter<T extends IResponseType = IResponseType> {
    send(payload: T): Promise<void>;
    get(key: string, force?: boolean): Promise<T>;
}   
