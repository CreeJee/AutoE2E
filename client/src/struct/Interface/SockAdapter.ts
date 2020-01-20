export interface IResponseType<T = {}> {
    key: string;
    data: T;
}
export type ResponseMixin<T> = IResponseType<T>;
export type AdapterHandler<T> = (data: T) => void;
export interface IAdapter<T extends IResponseType = IResponseType> {
    get<ResponseType extends T = T>(key: string, force?: boolean): Promise<ResponseType>;
    send<RequestType extends T = T>(payload: RequestType): void;
    dispatch<RequestType extends T = T,ResponseType extends T = T>(key: string, payload: RequestType): Promise<ResponseType>
    bind<ResponseType extends T = T>(key: string, on: AdapterHandler<ResponseType>): void;
    unBind<ResponseType extends T = T>(key: string, on: AdapterHandler<ResponseType>): void;
}   
