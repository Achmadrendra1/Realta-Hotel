import { JobRole } from './JobRole';
import { Users } from './Users';
import { WorkOrderDetail } from './WorkOrderDetail';
export declare class Employee {
    empId: number;
    empNationalId: string | null;
    empBirthDate: string | null;
    empMaritalStatus: string | null;
    empGender: string | null;
    empHireDate: Date | null;
    empSalariedFlag: string | null;
    empVacationHours: number | null;
    empSickleaveHourse: number | null;
    empCurrentFlag: number | null;
    empPhoto: string | null;
    empModifiedDate: Date | null;
    empEmp: Employee;
    employees: Employee[];
    empJoro: JobRole;
    empUser: Users;
    wodeEmp: WorkOrderDetail[];
}
