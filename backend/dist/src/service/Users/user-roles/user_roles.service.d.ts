import { UserRoles } from 'src/entities/UserRoles';
import { Repository } from 'typeorm';
export declare class UserRolesService {
    private UserRolesRepository;
    constructor(UserRolesRepository: Repository<UserRoles>);
    Create(items: UserRoles): Promise<{
        message: string;
        result: {
            usroUserId: number;
            usroRole: import("../../../entities/Roles").Roles;
        } & UserRoles;
    }>;
    findAll(): Promise<UserRoles[]>;
    update(id: number, items: UserRoles): Promise<{
        Message: string;
        Hasil: import("typeorm").UpdateResult;
    }>;
    remove(id: number): Promise<void>;
}
