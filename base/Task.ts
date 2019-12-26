// Function 이 아니라 Tgrid receiver 호환되게/

export class Task extends Array<Function> {
    err: Error;
    status: boolean;
    timeout : Number;
    constructor(...actions: Array<Function>) {
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