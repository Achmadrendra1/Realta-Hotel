/// <reference types="multer" />
import { EmployeeService } from '../../../Service/HR/employee/employee.service';
import { JobRoleService } from '../../../Service/HR/job-role/job-role.service';
export declare class EmployeeController {
    private employeeService;
    private jobRoleService;
    constructor(employeeService: EmployeeService, jobRoleService: JobRoleService);
    allEmployee(): Promise<any>;
    detailEmployee(param: any): Promise<any>;
    getPhoto(file: string, res: any): any;
    addEmployees(file: Express.Multer.File, body: any): Promise<any>;
    updatePhotoEmp(file: Express.Multer.File, body: any): Promise<any>;
    mutationsEmployee(body: any): Promise<any>;
    payHistory(body: any): Promise<any>;
    updateEmployee(body: any): Promise<any>;
    deleteEmployees(id: any): Promise<any>;
}
