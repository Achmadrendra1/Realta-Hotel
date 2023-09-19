import { BankService } from 'src/Service/Payment/bank/bank.service';
export declare class BankController {
    private bankService;
    constructor(bankService: BankService);
    getAllBank(): Promise<import("../../../entities/Bank").Bank[]>;
    paginateGetAll(query: any): Promise<{
        data: import("../../../entities/Bank").Bank[];
        count: number;
        currentPage: number;
    }>;
    getBankId(params: any): Promise<import("../../../entities/Bank").Bank[]>;
    createNewBank(body: any): Promise<{
        message: string;
        result: {
            data: import("../../../entities/Bank").Bank[];
            count: number;
            currentPage: number;
        };
    }>;
    updateBank(params: any, body: any): Promise<{
        message: string;
    }>;
    deleteBank(params: any): Promise<string>;
}
