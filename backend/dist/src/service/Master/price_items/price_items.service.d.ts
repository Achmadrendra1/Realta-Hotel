import { Repository } from 'typeorm';
import { PriceItems } from 'src/entities/PriceItems';
export declare class PriceItemsService {
    private priceItemsRepository;
    constructor(priceItemsRepository: Repository<PriceItems>);
    findAllPriceItems(): Promise<any>;
    findOnePriceItems(pritId: number): Promise<any>;
    getPriceByName(name: string): Promise<any>;
    getPriceItemByHotelName(name: string): Promise<any>;
    createPriceItems(data: PriceItems): Promise<PriceItems>;
    updatePriceItems(pritId: number, data: PriceItems): Promise<any>;
    deletePriceItems(pritId: number): Promise<any>;
}
