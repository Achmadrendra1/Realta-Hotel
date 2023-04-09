import { Hotels } from 'src/entities/Hotels';
import { Repository } from 'typeorm';
export declare class HotelsService {
    private hotelRepository;
    constructor(hotelRepository: Repository<Hotels>);
    findAllHotels(query?: any): Promise<{
        data: Hotels[];
        page: any;
        count: number;
        currentPage: number;
    }>;
    findByNameId(hotelId: number): Promise<any>;
    findByHotelName(hotelName: any): Promise<any>;
    addNewHotel(hotel: any): Promise<any>;
    UpdateHotel(hotelId: any, hotel: Hotels): Promise<any>;
    deleteHotels(id: Hotels): Promise<void>;
}
