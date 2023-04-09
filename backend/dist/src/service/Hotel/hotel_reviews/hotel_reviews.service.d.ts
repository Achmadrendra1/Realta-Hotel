import { HotelReviews } from 'src/entities/HotelReviews';
import { Repository } from 'typeorm';
export declare class HotelReviewsService {
    private hotelReviewsRepository;
    constructor(hotelReviewsRepository: Repository<HotelReviews>);
    findAllHotelsReviews(): Promise<HotelReviews[]>;
    findReviewById(hotel: HotelReviews): Promise<HotelReviews>;
    addNewHotelReviews(hotel: HotelReviews): Promise<any>;
    UpdateHotelReviews(Id: number, hotel: HotelReviews): Promise<any>;
    deleteHotelsReviews(id: HotelReviews): Promise<any>;
}
