import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { IResponseType, AdapterHandler } from 'src/struct/Interface/SockAdapter';
import { Instance as adapter } from '../lib/Socket';

type AdapterType<T> = IResponseType<T>;
type AdapterHandlerType<T> = AdapterHandler<AdapterType<T>>;
//react type wrapping
type reactStateType<T> = T;
type reactDispatchType<T> = Dispatch<SetStateAction<reactStateType<T>>>;
type reactUseStateType<T> = [reactStateType<T>, reactDispatchType<T>]
export function useAdapterState<ResponseType>(key: string, initValue: ResponseType): reactUseStateType<ResponseType> {
    const originState = useState<ResponseType>(initValue);
    const [response, setResponse] = originState;
    const handler: AdapterHandlerType<ResponseType> = (value: AdapterType<ResponseType>) => {
        setResponse(value.data);
    }
    useEffect(() => {
        adapter.bind<AdapterType<ResponseType>>(key, handler);
        return () => {
            adapter.unBind(key, handler);
        }
    }, [response, key])
    return originState;
}