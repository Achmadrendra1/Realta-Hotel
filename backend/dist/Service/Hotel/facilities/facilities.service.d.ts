import { Facilities } from 'src/entities/Facilities';
import { FacilityPriceHistory } from 'src/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';
import { HotelsService } from '../hotels/hotels.service';
export declare class FacilitiesService {
    private faciRepository;
    private faciHistoryRepository;
    private HotelsService;
    constructor(faciRepository: Repository<Facilities>, faciHistoryRepository: Repository<FacilityPriceHistory>, HotelsService: HotelsService);
    findAllFaci(): Promise<any>;
    landing(): Promise<any>;
    landingById(faciId: number): Promise<any>;
    findByFaciId(faciId: number): Promise<any>;
    addNewFaci(faci: any): Promise<any>;
    UpdateFaci(faciId: number, faci: any): Promise<any>;
    deleteFaci(id: Facilities): Promise<void>;
}
