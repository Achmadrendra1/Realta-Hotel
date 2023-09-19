import { Repository } from 'typeorm';
import { StockPhoto } from 'src/entities/StockPhoto';
export declare class SphoService {
    private sphoRepository;
    constructor(sphoRepository: Repository<StockPhoto>);
    findAllSpho(): Promise<any>;
    findSphoId(id: number): Promise<any>;
    findSphoName(stockPhoto: StockPhoto): Promise<any>;
    addSpho(url: any, stockPhoto: StockPhoto): Promise<any>;
    editSpho(id: number, spho: StockPhoto): Promise<any>;
    dropSpho(id: number): Promise<any>;
}
