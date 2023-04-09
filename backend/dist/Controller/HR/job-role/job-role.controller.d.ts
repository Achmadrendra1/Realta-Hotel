import { JobRoleService } from '../../../Service/HR/job-role/job-role.service';
export declare class JobRoleController {
    jobRoleService: JobRoleService;
    constructor(jobRoleService: JobRoleService);
    findAllRoles(): Promise<any>;
    getSelectJob(): Promise<any>;
    findByName(param: any): Promise<any>;
}
