import { Department } from 'src/entities/Department';
import { Employee } from 'src/entities/Employee';
import { EmployeeDepartmentHistory } from 'src/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'src/entities/EmployeePayHistory';
import { JobRole } from 'src/entities/JobRole';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
export declare class EmployeeService {
    private employeeStore;
    private departmentHist;
    private paymentHist;
    private department;
    private users;
    private job;
    constructor(employeeStore: Repository<Employee>, departmentHist: Repository<EmployeeDepartmentHistory>, paymentHist: Repository<EmployeePayHistory>, department: Repository<Department>, users: Repository<Users>, job: Repository<JobRole>);
    getEmployee(): Promise<any>;
    getDeptHistory(id: number): Promise<any>;
    getPayHistory(id: number): Promise<any>;
    employeeDetail(id: number): Promise<any>;
    updatePhotos(id: number, file: any): Promise<any>;
    addEmployee(data: any, file: any, jobs: any): Promise<any>;
    deleteEmployee(id: number): Promise<any>;
    updateEmployee(data: any, jobs: any): Promise<any>;
    addMutations(data: any): Promise<any>;
    addPay(data: any): Promise<any>;
}
