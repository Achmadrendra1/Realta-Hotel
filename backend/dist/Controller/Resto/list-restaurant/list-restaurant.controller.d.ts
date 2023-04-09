import { ListRestaurantService } from 'src/Service/Resto/list-restaurant/list-restaurant.service';
export declare class ListRestaurantController {
    private readonly listResto;
    constructor(listResto: ListRestaurantService);
    getListResto(param: any): Promise<{
        data: any;
        counts: any;
    }>;
}
