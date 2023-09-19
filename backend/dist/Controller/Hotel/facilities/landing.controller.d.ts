import { FacilitiesService } from 'src/Service/Hotel/facilities/facilities.service';
export declare class LandingController {
    private LandingService;
    constructor(LandingService: FacilitiesService);
    getLanding(): Promise<any>;
    getLandingId(id: any): Promise<any>;
}
