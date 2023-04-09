import { FacilityPriceHistory } from 'src/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';
export declare class FacilityPriceHistoryService {
    private faphRepository;
    constructor(faphRepository: Repository<FacilityPriceHistory>);
    findAllFaph(): Promise<any>;
    findByFaphId(faph: FacilityPriceHistory): Promise<any>;
    addNewFaph(faph: FacilityPriceHistory): Promise<any>;
    UpdateFaph(id: number, faph: FacilityPriceHistory): Promise<any>;
    deleteFaph(id: FacilityPriceHistory): Promise<void>;
}
