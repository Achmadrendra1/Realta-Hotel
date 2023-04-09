import { RestoMenus } from 'src/entities/RestoMenus';
import { Repository } from 'typeorm';
export declare class RestoMenuDetailService {
    private restoMenuRepo;
    constructor(restoMenuRepo: Repository<RestoMenus>);
    getAll(): Promise<any>;
}
