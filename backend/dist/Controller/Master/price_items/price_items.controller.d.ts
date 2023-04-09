import { PriceItemsService } from 'src/Service/Master/price_items/price_items.service';
import { PriceItems } from 'src/entities/PriceItems';
export declare class PriceItemsController {
    private PriceItemsService;
    constructor(PriceItemsService: PriceItemsService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    priceName(params: any): Promise<any>;
    pricehotel(params: any): Promise<any>;
    createPriceItems(data: PriceItems): Promise<"failed insert to regions" | " success insert to regions">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): Promise<any>;
}
