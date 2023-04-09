import { FacilitiesService } from '../../../Service/Hotel/facilities/facilities.service';
export declare class FacilitiesController {
    private FaciService;
    constructor(FaciService: FacilitiesService);
    getFacility(): Promise<any>;
    getFacilityId(id: any): Promise<any>;
    UpdateFacility(id: any, body: any): Promise<any>;
    addFacility(body: any): Promise<any>;
    DeleteFacility(id: any): Promise<void>;
}
