export interface IResponseType<T = {}> {
    key: string;
    data: T;
}
type RT = IResponseType;
export type AdapterHandler<T> = (data: T) => void;
export interface IAdapter {
    get<ResponseType extends RT = RT>(key: string, force?: boolean): Promise<ResponseType>;
    send<RequestType extends RT = RT>(payload: RequestType): void;
    dispatch<RequestType extends RT = RT,ResponseType extends RT = RT>(key: string, payload: RequestType): Promise<ResponseType>
    bind<ResponseType extends RT = RT>(key: string, on: AdapterHandler<ResponseType>): void;
    unBind<ResponseType extends RT = RT>(key: string, on: AdapterHandler<ResponseType>): void;
}   
