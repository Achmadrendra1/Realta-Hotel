import { SpecialOffersService } from '../../../Service/Booking/special-offers/special-offers.service';
export declare class SpecialOffersController {
    private readonly SpecialOffersService;
    constructor(SpecialOffersService: SpecialOffersService);
    findAllSpecialOffers(): Promise<any>;
    findAllId(params: any): Promise<any>;
    createSpecialOffers(body: any): Promise<any>;
    updateSpecialOffers(params: any, body: any): Promise<any>;
    deleteSpecialOffers(params: any): Promise<{
        messeage: string;
        return: import("typeorm").DeleteResult;
    }>;
}
