import { VendorService } from '../../../service/Purchasing/vendor/vendor.service';
export declare class VendorController {
    private vendorService;
    constructor(vendorService: VendorService);
    getVendor(): Promise<any>;
    getVendorId(params: any): Promise<any>;
    getVendorName(params: any): Promise<any>;
    createVendor(body: any): Promise<any>;
    updateVendor(params: any, body: any): Promise<any>;
    deleteVendor(params: any): Promise<any>;
}
