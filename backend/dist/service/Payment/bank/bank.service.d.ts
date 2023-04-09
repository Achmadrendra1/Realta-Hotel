import { Bank } from 'src/entities/Bank';
import { Repository } from 'typeorm';
import { EntitysService } from '../entitys/entitys.service';
export declare class BankService {
    private bankRepository;
    private entityService;
    constructor(bankRepository: Repository<Bank>, entityService: EntitysService);
    getAll(): Promise<Bank[]>;
    getPagination(query?: any): Promise<{
        data: Bank[];
        count: number;
        currentPage: number;
    }>;
    getbyId(id: number): Promise<Bank[]>;
    getByCode(bankCode: string): Promise<Bank>;
    getByName(bankName: string): Promise<Bank>;
    createBank(items: Bank): Promise<{
        message: string;
        result: {
            data: Bank[];
            count: number;
            currentPage: number;
        };
    }>;
    updateBank(id: number, items: Bank): Promise<{
        message: string;
    }>;
    deleteBank(id: number): Promise<string>;
}
