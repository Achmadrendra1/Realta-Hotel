import { VeproService } from '../../../Service/Purchasing/vendor-product/vendor-product.service';
export declare class VeproController {
    private veproService;
    constructor(veproService: VeproService);
    getVepro(): Promise<any>;
    getVeproId(params: any): Promise<any>;
    createVepro(body: any): Promise<any>;
    updateStod(params: any, body: any): Promise<any>;
    deleteVepro(params: any): Promise<any>;
}
