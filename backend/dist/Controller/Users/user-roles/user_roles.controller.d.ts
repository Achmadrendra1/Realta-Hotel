import { UserRolesService } from 'src/Service/Users/user-roles/user_roles.service';
import { UserRoles } from 'src/entities/UserRoles';
export declare class UserRolesController {
    private userRolesService;
    constructor(userRolesService: UserRolesService);
    Create(Body: any): Promise<{
        message: string;
        result: {
            usroUserId: number;
            usroRole: import("../../../entities/Roles").Roles;
        } & UserRoles;
    }>;
    findAll(): Promise<any>;
    update(id: any, item: UserRoles): Promise<{
        Message: string;
        Hasil: import("typeorm").UpdateResult;
    }>;
    remove(id: string): Promise<void>;
}
