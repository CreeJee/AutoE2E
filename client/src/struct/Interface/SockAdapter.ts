export interface IResponseType {
    key: string;
    data: object;
}
export type AdapterHandler<T> = (data: T) => void;
export interface IAdapter<T extends IResponseType = IResponseType> {
    send(payload: T): Promise<void>;
    get(key: string, force?: boolean): Promise<T>;
    bind(key: string, on: AdapterHandler<T>): void;
    unBind(key: string, on: AdapterHandler<T>): void;
}   
