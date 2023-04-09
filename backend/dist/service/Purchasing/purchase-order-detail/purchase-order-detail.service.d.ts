import { Repository } from 'typeorm';
import { PurchaseOrderDetail } from 'src/entities/PurchaseOrderDetail';
export declare class PodeService {
    private podeRepository;
    constructor(podeRepository: Repository<PurchaseOrderDetail>);
    findAllPode(): Promise<any>;
    findPodeId(id: number): Promise<any>;
    addPode(pode: PurchaseOrderDetail): Promise<any>;
    editPode(id: number, pode: PurchaseOrderDetail): Promise<any>;
    dropPode(id: number): Promise<any>;
}
