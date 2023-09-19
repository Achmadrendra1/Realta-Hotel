import { Roles } from 'src/entities/Roles';
import { Repository } from 'typeorm';
export declare class RolesService {
    private readonly RolesRepository;
    constructor(RolesRepository: Repository<Roles>);
    CreateRoles(item: Roles): Promise<Roles>;
    findAll(): Promise<Roles[]>;
    findOne(id: number): Promise<Roles>;
    update(id: number, item: Roles): Promise<{
        Message: string;
        Hasil: import("typeorm").UpdateResult;
    }>;
    Delete(id: number): Promise<{
        Message: string;
        Hasil: import("typeorm").DeleteResult;
    }>;
}
