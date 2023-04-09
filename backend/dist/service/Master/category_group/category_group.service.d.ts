import { CategoryGroup } from 'src/entities/CategoryGroup';
import { Repository } from 'typeorm';
export declare class CategoryGroupService {
    private categoryGroupRepository;
    constructor(categoryGroupRepository: Repository<CategoryGroup>);
    findAllCategoryGroup(): Promise<any>;
    findOneCategoryGroup(cagroId: number): Promise<any>;
    getCategoryGroupByName(name: string): Promise<any>;
    createCategoryGroup(data: CategoryGroup): Promise<any>;
    storeFileInfo(file: {
        filename: any;
        originalName: any;
    }, body: any): Promise<{
        result: any;
    }>;
    updateCategoryGroup(cagroId: number, data: CategoryGroup): Promise<any>;
    deleteCategoryGroup(cagroId: number): Promise<any>;
}
