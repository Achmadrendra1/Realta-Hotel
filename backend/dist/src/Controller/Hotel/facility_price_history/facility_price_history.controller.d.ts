import { FacilityPriceHistoryService } from '../../../Service/Hotel/facility_price_history/facility_price_history.service';
export declare class FacilityPriceHistoryController {
    private FaphService;
    constructor(FaphService: FacilityPriceHistoryService);
    getFaph(): Promise<any>;
    getFaphId(id: any): Promise<any>;
    UpdateFaph(id: any, body: any): Promise<any>;
    addFaph(body: any): Promise<any>;
    DeleteHore(id: any): Promise<void>;
}
