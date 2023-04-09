import { RestoMenus } from 'src/entities/RestoMenus';
import { Repository } from 'typeorm';
export declare class RestoMenusService {
    private restoMenusRepository;
    constructor(restoMenusRepository: Repository<RestoMenus>);
    getMenus(): Promise<RestoMenus[]>;
    getMenuByFacility(Param: any): Promise<any>;
    getMenuForUser(Param: any, body: any): Promise<{
        data: any;
        counts: any;
    }>;
    getMenuForAdmin(body: any): Promise<{
        data: any;
        counts: any;
    }>;
    getMenu(param: any): Promise<any>;
    addMenus(body: any): Promise<import("typeorm").InsertResult>;
    editMenu(param: any, body: any): Promise<import("typeorm").UpdateResult>;
    deleteMenu(param: any): Promise<import("typeorm").DeleteResult>;
}
