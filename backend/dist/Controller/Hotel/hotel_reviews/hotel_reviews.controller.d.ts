import { HotelReviewsService } from '../../../Service/Hotel/hotel_reviews/hotel_reviews.service';
export declare class HotelReviewsController {
    private horeService;
    constructor(horeService: HotelReviewsService);
    getHore(): Promise<import("../../../entities/HotelReviews").HotelReviews[]>;
    getHoreId(id: any): Promise<import("../../../entities/HotelReviews").HotelReviews>;
    UpdateHore(id: any, body: any): Promise<any>;
    addHore(body: any): Promise<any>;
    DeleteHore(id: any): Promise<any>;
}
