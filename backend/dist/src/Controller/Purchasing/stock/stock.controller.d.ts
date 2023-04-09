import { StockService } from '../../../service/Purchasing/stock/stock.service';
export declare class StockController {
    private stockService;
    constructor(stockService: StockService);
    getStocks(): Promise<any>;
    getStockCart(): Promise<any>;
    getStockId(params: any): Promise<any>;
    getStockName(params: any): Promise<any>;
    createStock(body: any): Promise<any>;
    updateStock(params: any, body: any): Promise<any>;
    deleteStock(params: any): Promise<any>;
}
