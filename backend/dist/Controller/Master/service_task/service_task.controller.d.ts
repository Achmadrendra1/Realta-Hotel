import { ServiceTaskService } from 'src/Service/Master/service_task/service_task.service';
import { ServiceTask } from 'src/entities/ServiceTask';
export declare class ServiceTaskController {
    private ServiceTaskService;
    constructor(ServiceTaskService: ServiceTaskService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    createService(data: ServiceTask): Promise<"failed insert to service" | " success insert to service">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): Promise<any>;
}
