import { PodeService } from '../../../Service/Purchasing/purchase-order-detail/purchase-order-detail.service';
export declare class PodeController {
    private podeService;
    constructor(podeService: PodeService);
    getPode(): Promise<any>;
    getPodeId(params: any): Promise<any>;
    createPode(body: any): Promise<any>;
    updatePode(params: any, body: any): Promise<any>;
    deletePode(params: any): Promise<any>;
}
