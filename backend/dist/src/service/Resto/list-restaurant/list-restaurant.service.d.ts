import { Facilities } from 'src/entities/Facilities';
import { Repository } from 'typeorm';
export declare class ListRestaurantService {
    private readonly restoRepository;
    constructor(restoRepository: Repository<Facilities>);
    getListResto(param: any): Promise<{
        data: any;
        counts: any;
    }>;
}
