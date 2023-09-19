import { Repository } from 'typeorm';
import { StockDetail } from 'src/entities/StockDetail';
export declare class StodService {
    private stodRepository;
    constructor(stodRepository: Repository<StockDetail>);
    findAllStod(): Promise<any>;
    findStodId(id: number): Promise<any>;
    addNewStod(stod: StockDetail): Promise<any>;
    editStod(id: number, stod: any): Promise<any>;
    dropStod(id: number): Promise<any>;
}
