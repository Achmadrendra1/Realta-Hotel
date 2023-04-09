import { HotelsService } from '../../../Service/Hotel/hotels/hotels.service';
export declare class HotelsController {
    private hotelsService;
    constructor(hotelsService: HotelsService);
    getHotels(query: any): Promise<{
        data: import("../../../entities/Hotels").Hotels[];
        page: any;
        count: number;
        currentPage: number;
    }>;
    getHotelsId(id: number): Promise<any>;
    UpdateHotel(id: any, body: any): Promise<any>;
    addHotel(body: any): Promise<any>;
    DeleteHotel(id: any): Promise<void>;
}
