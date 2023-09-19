import { JobRole } from 'src/entities/JobRole';
import { Repository } from 'typeorm';
export declare class JobRoleService {
    jobRoles: Repository<JobRole>;
    constructor(jobRoles: Repository<JobRole>);
    findAJob(id: number): Promise<any>;
    getAllJob(): Promise<any>;
    getJobSelection(): Promise<any>;
}
