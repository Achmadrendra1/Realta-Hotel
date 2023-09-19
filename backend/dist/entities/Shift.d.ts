import { EmployeeDepartmentHistory } from "./EmployeeDepartmentHistory";
export declare class Shift {
    shiftId: number;
    shiftName: string | null;
    shiftStartTime: string | null;
    shiftEndTime: string | null;
    employeeDepartmentHistories: EmployeeDepartmentHistory[];
}
