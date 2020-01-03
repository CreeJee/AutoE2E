export type FlowMap = Map<Function, Function>;
export type Cond = (...v: any) => boolean
export type FlowHandlers = Function[];
export const isPrimitive = (typeName: string) => (v) => (typeof v === typeName);
export const hasInstance = (classConstructor) => ((v) => v instanceof classConstructor);

export class FlowError extends Error {
    constructor (msg) {
        super();
        this.message = `[FlowError] ${msg}`
    }
}
export class Flow {
    readonly default: Function;
    private _flowMap: Map<Cond, FlowHandlers>;
    constructor (flow: Iterable<[Cond, FlowHandlers]>, defaultHandler?: Function) {
        this._flowMap = new Map<Cond, FlowHandlers>(flow)
        this.default = (typeof defaultHandler === 'function') ? defaultHandler : () => {}
    }

    async exec (...value: any[]) {
        const flow = this._flowMap
        let handlers: FlowHandlers = [this.default]
        for (const flowCond of flow.keys()) {
            if (flowCond(...value)) {
                handlers = flow.get(flowCond)
            }
        }
        await this.eval(handlers, ...value);
    }

    async call (cond :Cond, ...value: any) {
        const flow = this._flowMap;
        await this.eval(flow.get(cond), ...value);
    }

    async eval (handlers: FlowHandlers, ...value: any) {
        if (!Array.isArray(handlers)) {
            handlers = [];
        }
        for await (const handler of handlers) {
            await handler(...value)
        }
    }

    add (cond: Cond, ...handlers: FlowHandlers) {
        const flow = this._flowMap
        if (flow.has(cond)) {
            throw new FlowError('duplicated flow')
        }
        flow.set(cond, handlers)
    }
}
