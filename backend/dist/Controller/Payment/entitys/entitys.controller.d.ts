import { EntitysService } from 'src/Service/Payment/entitys/entitys.service';
export declare class EntitysController {
    private entityService;
    constructor(entityService: EntitysService);
    getAllData(): Promise<import("../../../entities/Entitys").Entitys[]>;
    getOne(): Promise<import("../../../entities/Entitys").Entitys[]>;
    createData(): Promise<import("../../../entities/Entitys").Entitys>;
    deleteData(params: any): Promise<import("typeorm").DeleteResult>;
}
