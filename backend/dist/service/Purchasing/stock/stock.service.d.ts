import { Repository } from 'typeorm';
import { Stocks } from 'src/entities/Stocks';
export declare class StockService {
    private stockRepository;
    constructor(stockRepository: Repository<Stocks>);
    findAllStock(): Promise<any>;
    stockCart(): Promise<any>;
    findStockId(id: number): Promise<any>;
    findStockName(stockName: string): Promise<any>;
    addNewStock(stock: Stocks): Promise<any>;
    editStock(id: number, stock: Stocks): Promise<any>;
    dropStock(id: number): Promise<any>;
}
