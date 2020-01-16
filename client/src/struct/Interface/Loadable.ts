export interface ILoadable<T>{
    load(): Promise<T>;
}