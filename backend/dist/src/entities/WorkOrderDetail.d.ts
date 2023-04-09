import { Facilities } from './Facilities';
import { ServiceTask } from './ServiceTask';
import { WorkOrders } from './WorkOrders';
import { Employee } from './Employee';
export declare class WorkOrderDetail {
    wodeId: number;
    wodeTaskName: string | null;
    wodeStatus: string | null;
    wodeStartDate: Date | null;
    wodeEndDate: Date | null;
    wodeNotes: string | null;
    wodeEmpId: number | null;
    wodeFaci: Facilities;
    wodeSeta: ServiceTask;
    wodeWoro: WorkOrders;
    wodeEmp: Employee;
}
