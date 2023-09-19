import { Repository } from 'typeorm';
import { ServiceTask } from 'src/entities/ServiceTask';
export declare class ServiceTaskService {
    private serviceTaskRepository;
    constructor(serviceTaskRepository: Repository<ServiceTask>);
    findAllServiceTask(): Promise<any>;
    findOneServiceTask(setaId: number): Promise<any>;
    getServiceByJobRole(name: string): Promise<any>;
    createService(data: ServiceTask): Promise<ServiceTask>;
    updateServiceTask(setaId: number, data: ServiceTask): Promise<any>;
    deleteServiceTask(setaId: number): Promise<any>;
}
