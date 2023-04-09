import { Repository } from 'typeorm';
import { Vendor } from 'src/entities/Vendor';
export declare class VendorService {
    private vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    findAllVendor(): Promise<any>;
    findVendorId(id: number): Promise<any>;
    findVendorName(vendor: Vendor): Promise<any>;
    addVendor(vendor: Vendor): Promise<any>;
    editVendor(id: number, vendor: Vendor): Promise<any>;
    dropVendor(id: number): Promise<any>;
}
