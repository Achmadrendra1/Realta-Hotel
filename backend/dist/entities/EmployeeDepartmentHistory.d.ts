import { Shift } from './Shift';
import { Department } from './Department';
export declare class EmployeeDepartmentHistory {
    edhiId: number;
    edhiEmpId: number | null;
    edhiStartDate: Date | null;
    edhiEndDate: Date | null;
    edhiModifiedDate: Date | null;
    edhiDept: Department;
    edhiShift: Shift;
}
