import { Department } from 'src/entities/Department';
import { Repository } from 'typeorm';
export declare class DepartmentService {
    private deptStore;
    constructor(deptStore: Repository<Department>);
    getDept(): Promise<any>;
    updateDept(id: number, data: any): Promise<any>;
    addDept(data: object): Promise<any>;
    delDept(id: number): Promise<any>;
    getSelect(): Promise<any>;
}
