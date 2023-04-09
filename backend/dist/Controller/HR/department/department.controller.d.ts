import { DepartmentService } from '../../../Service/HR/department/department.service';
export declare class DepartmentController {
    private deptStore;
    constructor(deptStore: DepartmentService);
    allDepartment(): Promise<any>;
    updateDepartment(param: any, body: any): Promise<any>;
    createDepartment(body: any): Promise<any>;
    deleletDepartment(param: any): Promise<any>;
    selectInput(): Promise<any>;
}
