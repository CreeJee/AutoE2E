export interface IResponseType {
    key: string;
    data: object;
}
export interface IAdapter<T extends IResponseType> {
    send(payload: T): Promise<void>;
    get(key: string): Promise<T>;
}
