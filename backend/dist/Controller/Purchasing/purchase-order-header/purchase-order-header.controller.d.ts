import { PoheService } from '../../../Service/Purchasing/purchase-order-header/purchase-order-header.service';
export declare class PoheController {
    private poheService;
    constructor(poheService: PoheService);
    getPohe(): Promise<any>;
    getPoheId(params: any): Promise<any>;
    getPoheNumber(params: any): Promise<any>;
    createPohe(body: any): Promise<any>;
    updatePohe(params: any, body: any): Promise<any>;
    deletePohe(params: any): Promise<any>;
}
