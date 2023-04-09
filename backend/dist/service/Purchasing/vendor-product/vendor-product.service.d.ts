import { Repository } from 'typeorm';
import { VendorProduct } from 'src/entities/VendorProduct';
export declare class VeproService {
    private veproRepository;
    constructor(veproRepository: Repository<VendorProduct>);
    findAllVepro(): Promise<any>;
    findVeproId(id: number): Promise<any>;
    addVepro(vepro: any): Promise<any>;
    editVepro(id: number, vepro: any): Promise<any>;
    dropVepro(id: number): Promise<any>;
}
