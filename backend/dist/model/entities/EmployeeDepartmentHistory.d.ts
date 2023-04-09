import { Department } from "./Department";
import { Employee } from "./Employee";
import { Shift } from "./Shift";
export declare class EmployeeDepartmentHistory {
    edhiId: number;
    edhiEmpId: number | null;
    edhiStartDate: Date | null;
    edhiEndDate: Date | null;
    edhiModifiedDate: Date | null;
    edhiDept: Department;
    edhiEmp: Employee;
    edhiShift: Shift;
}
