export interface IAdapter<T> {
    send(payload: T): Promise<void>;
    get(key: string): Promise<T>;
}