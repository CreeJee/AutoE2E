import {Task} from './Task';
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