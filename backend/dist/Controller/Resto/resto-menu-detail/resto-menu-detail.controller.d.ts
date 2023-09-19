import { RestoMenuDetailService } from 'src/Service/Resto/resto-menu-detail/resto-menu-detail.service';
export declare class RestoMenuDetailController {
    private restoMenuDetailService;
    constructor(restoMenuDetailService: RestoMenuDetailService);
    getMenus(): Promise<any>;
}
