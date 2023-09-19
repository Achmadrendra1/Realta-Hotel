import { UserProfiles } from 'src/entities/UserProfiles';
import { UserRoles } from 'src/entities/UserRoles';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
interface User {
    user_id: any;
    user_full_name: any;
    user_type: any;
    user_company_name: any;
    user_email: any;
    user_phone_number: any;
    user_modified_date: Date;
    uspro_national_id: any;
    uspro_birt_date: any;
    uspro_job_title: any;
    uspro_marital_status: any;
    uspro_gender: any;
    usro_role: any;
    uspa_password_hash: any;
    uspa_user: any;
}
export declare class UsersService {
    private readonly UsersRepository;
    private readonly UserProfilesRepository;
    private readonly UserRolesRepository;
    constructor(UsersRepository: Repository<Users>, UserProfilesRepository: Repository<UserProfiles>, UserRolesRepository: Repository<UserRoles>);
    findAll(): Promise<any>;
    findByEmail(userEmail: any): Promise<any>;
    register(user: any): Promise<any>;
    Delete(id: number): Promise<void>;
    updateProfile(id: any, data: User): Promise<any>;
}
export {};
