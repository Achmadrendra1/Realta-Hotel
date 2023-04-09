import { Repository } from 'typeorm';
import { PurchaseOrderHeader } from 'src/entities/PurchaseOrderHeader';
export declare class PoheService {
    private poheRepository;
    constructor(poheRepository: Repository<PurchaseOrderHeader>);
    findAllPohe(): Promise<any>;
    findPoheId(id: number): Promise<any>;
    findPoheNumber(pohe: PurchaseOrderHeader): Promise<any>;
    addPohe(pohe: PurchaseOrderHeader): Promise<any>;
    editPohe(id: number, pohe: PurchaseOrderHeader): Promise<any>;
    dropPohe(id: number): Promise<any>;
}
