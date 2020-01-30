import { useEffect, useState as builtuseState, Dispatch, SetStateAction } from 'react';
import { IResponseType, AdapterHandler } from 'src/struct/Interface/SockAdapter';
import { Instance as adapter } from '../lib/Socket';

type AdapterType<T> = IResponseType<T>;
type AdapterHandlerType<T> = AdapterHandler<AdapterType<T>>;
//react type wrapping
type reactStateType<T> = T;
type reactDispatchType<T> = Dispatch<SetStateAction<reactStateType<T>>>;
type reactUseStateType<T> = [reactStateType<T>, reactDispatchType<T>];
function generateHandler<T>(setResponse: reactDispatchType<T>): AdapterHandlerType<T> {
    return (value: AdapterType<T>) => {
        setResponse(value.data);
    }
}
export function useBoundState<ResponseType>(key: string, initValue: ResponseType): reactUseStateType<ResponseType> {
    const originState = builtuseState<ResponseType>(initValue);
    const [response, setResponse] = originState;
    const handler: AdapterHandlerType<ResponseType> = generateHandler(setResponse);
    useEffect(() => {
        adapter.bind<AdapterType<ResponseType>>(key, handler);
        return () => {
            adapter.unBind(key, handler);
        }
    }, [response, key])
    return originState;
}
export function useState<ResponseType>(key: string, initValue: ResponseType): reactUseStateType<ResponseType> {
    const originState = builtuseState<ResponseType>(initValue);
    const [response, setResponse] = originState;
    const handler: AdapterHandlerType<ResponseType> = generateHandler(setResponse);
    useEffect(() => {
        adapter.get<AdapterType<ResponseType>>(key).then(handler);
    }, [response, key])
    return originState;
}
export function gqlDispatch(key: string, query: string) {
    adapter.send<IResponseType<string>>({key, data: query})
}
export function useGqlState<ResponseType>(key: string, query: string, fallbackValue: ResponseType) {
    //well undefined & one mutation
    const state = useState<ResponseType>(key, fallbackValue);
    gqlDispatch(key, query);
    return state;
}