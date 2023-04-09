import { PaymentGatewayService } from 'src/Service/Payment/payment-gateway/payment-gateway.service';
export declare class PaymentGatewayController {
    private payService;
    constructor(payService: PaymentGatewayService);
    getAllBank(): Promise<import("../../../entities/PaymentGateway").PaymentGateway[]>;
    getPagination(query: any): Promise<{
        data: import("../../../entities/PaymentGateway").PaymentGateway[];
        count: number;
        currentPage: number;
    }>;
    getBankId(params: any): Promise<import("../../../entities/PaymentGateway").PaymentGateway[]>;
    createNewBank(body: any): Promise<{
        message: string;
        result: import("../../../entities/PaymentGateway").PaymentGateway[];
    }>;
    updateBank(params: any, body: any): Promise<{
        message: string;
    }>;
    deleteBank(params: any): Promise<string>;
}
