type Action = Function;

export class Task extends Array<Action> {
    err: Error;
    status: boolean;
    timeout : Number;
    constructor(...actions: Array<Action>) {
        super(...actions);
        this.err = null;
        this.status = null;
        this.timeout = 5000;
    }
    public async start() : Promise<void>{
        for await (const task of this) {
            try{
                task();
                this.status = true;
            } catch (e) {
                this.status = false;
                this.err = e;
                break;
            }
        }
    }
}
export class TaskManager extends Array<Task>{
    private flush: Task;
    constructor(flushTask: Task) {
        super();
        this.flush = flushTask;
    }
    load(...taskGroup : Array<Task>) : void{
        this.splice(this.length, 0 , ...taskGroup);
    }
    /**
     * start
     * [start promise microtask]
     */
    public async start() : Promise<Array<Task>>{
        const tasks = [];
        for (const task of this) {
            tasks.push(task.start());
        }
        const result = await Promise.all(tasks);
        await this.flush.start();
        return Promise.resolve(result);
    }
}