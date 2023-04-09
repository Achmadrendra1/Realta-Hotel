import { RolesService } from 'src/Service/Users/roles/roles.service';
import { Roles } from 'src/entities/Roles';
export declare class RolesController {
    private RolesService;
    constructor(RolesService: RolesService);
    CreateRoles(item: Roles): Promise<Roles>;
    findAll(): Promise<Roles[]>;
    findOne(id: string): Promise<Roles>;
    update(id: string, item: Roles): Promise<{
        Message: string;
        Hasil: import("typeorm").UpdateResult;
    }>;
    Delete(id: string): Promise<{
        Message: string;
        Hasil: import("typeorm").DeleteResult;
    }>;
}
