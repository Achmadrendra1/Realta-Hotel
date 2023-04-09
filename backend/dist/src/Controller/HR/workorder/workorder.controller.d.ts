import { WorkorderService } from '../../../Service/HR/workorder/workorder.service';
export declare class WorkorderController {
    private workorder;
    constructor(workorder: WorkorderService);
    workOrders(): Promise<any>;
    serviceTask(): Promise<any>;
    workOrderDetail(id: any): Promise<any>;
    addWorkOrder(body: any): Promise<any>;
    addWorkDetail(body: any): Promise<any>;
    updateDetails(body: any): Promise<any>;
    deleteWorkDetail(param: any): Promise<any>;
}
