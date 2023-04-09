import { PaymentGateway } from 'src/entities/PaymentGateway';
import { Repository } from 'typeorm';
import { EntitysService } from '../entitys/entitys.service';
export declare class PaymentGatewayService {
    private payRepository;
    private entityService;
    constructor(payRepository: Repository<PaymentGateway>, entityService: EntitysService);
    getAll(): Promise<PaymentGateway[]>;
    getPagination(query: any): Promise<{
        data: PaymentGateway[];
        count: number;
        currentPage: number;
    }>;
    getbyId(id: number): Promise<PaymentGateway[]>;
    getByCode(pagaCode: string): Promise<PaymentGateway>;
    getByName(pagaName: string): Promise<PaymentGateway>;
    createPaga(items: PaymentGateway): Promise<{
        message: string;
        result: PaymentGateway[];
    }>;
    updatePaga(id: number, items: PaymentGateway): Promise<{
        message: string;
    }>;
    deletePaga(id: number): Promise<string>;
}
