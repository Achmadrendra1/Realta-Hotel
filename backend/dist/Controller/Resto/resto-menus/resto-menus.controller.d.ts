import { RestoMenusService } from 'src/Service/Resto/resto-menus/resto-menus.service';
export declare class RestoMenusController {
    private restoMenuService;
    constructor(restoMenuService: RestoMenusService);
    getMenus(): Promise<import("../../../entities/RestoMenus").RestoMenus[]>;
    getMenu(Param: any): Promise<any>;
    getMenuByFacility(Param: any): Promise<any>;
    getMenuForAdmin(body: any): Promise<{
        data: any;
        counts: any;
    }>;
    getMenuForUser(Param: any, body: any): Promise<{
        data: any;
        counts: any;
    }>;
    addMenus(body: any): Promise<import("typeorm").InsertResult>;
    editMenu(Param: number, Body: any): Promise<import("typeorm").UpdateResult>;
    deleteMenu(param: number): Promise<import("typeorm").DeleteResult>;
}
