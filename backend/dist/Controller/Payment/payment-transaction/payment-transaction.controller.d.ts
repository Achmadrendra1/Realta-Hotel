import { PaymentTransactionService } from 'src/Service/Payment/payment-transaction/payment-transaction.service';
export declare class PaymentTransactionController {
    private payService;
    constructor(payService: PaymentTransactionService);
    getPagination(query: any): Promise<{
        data: any;
        count: any;
        currentPage: number;
    }>;
    getAll(query: any): Promise<{
        data: any;
        count: any;
    }>;
    createPayment(body: any): Promise<import("../../../entities/UserAccounts").UserAccounts>;
}
