import { PaymentTransaction } from 'src/entities/PaymentTransaction';
import { Repository } from 'typeorm';
import { UserAccountService } from '../user-account/user-account.service';
export declare class PaymentTransactionService {
    private payRepository;
    private usacService;
    constructor(payRepository: Repository<PaymentTransaction>, usacService: UserAccountService);
    getAll(query: any): Promise<{
        data: any;
        count: any;
    }>;
    getPagination(query: any): Promise<{
        data: any;
        count: any;
        currentPage: number;
    }>;
    getById(id: number): Promise<PaymentTransaction>;
    createData(items: any): Promise<import("../../../entities/UserAccounts").UserAccounts>;
    updateData(id: number, items: PaymentTransaction): Promise<{
        message: string;
        result: PaymentTransaction;
    }>;
}
