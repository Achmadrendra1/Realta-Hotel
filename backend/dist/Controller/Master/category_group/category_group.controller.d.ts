import { CategoryGroupService } from 'src/Service/Master/category_group/category_group.service';
import { CategoryGroup } from 'src/entities/CategoryGroup';
export declare class CategoryGroupController {
    private CategoryGroupService;
    constructor(CategoryGroupService: CategoryGroupService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    categoryName(params: any): Promise<any>;
    createCategoryGroup(data: CategoryGroup): Promise<"failed insert to Category" | " success insert to Category">;
    uploadFile(file: any, body: any): Promise<"gagal upload" | {
        message: string;
        result: any;
    }>;
    getPhoto(fileName: string, res: any): any;
    update(params: any, body: any): Promise<any>;
    remove(params: any): Promise<any>;
}
