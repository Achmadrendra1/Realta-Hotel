import { Entitys } from 'src/entities/Entitys';
import { Repository } from 'typeorm';
export declare class EntitysService {
    private entityRepository;
    constructor(entityRepository: Repository<Entitys>);
    getAll(): Promise<Entitys[]>;
    getOne(): Promise<Entitys[]>;
    createEntity(): Promise<Entitys>;
    deleteEntity(id: number): Promise<import("typeorm").DeleteResult>;
}
