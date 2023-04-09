import { Employee } from 'src/entities/Employee';
import { ServiceTask } from 'src/entities/ServiceTask';
import { WorkOrderDetail } from 'src/entities/WorkOrderDetail';
import { WorkOrders } from 'src/entities/WorkOrders';
import { Repository } from 'typeorm';
export declare class WorkorderService {
    private workorder;
    private workorderdetail;
    private service;
    private employee;
    constructor(workorder: Repository<WorkOrders>, workorderdetail: Repository<WorkOrderDetail>, service: Repository<ServiceTask>, employee: Repository<Employee>);
    getWorkOrders(): Promise<any>;
    getDeatils(id: number): Promise<any>;
    getService(): Promise<any>;
    addWorkOrder(datas: any): Promise<any>;
    addWorkDetail(datas: any): Promise<any>;
    deleteDetail(id: any): Promise<any>;
    updateWorkDetail(datas: any): Promise<any>;
}
