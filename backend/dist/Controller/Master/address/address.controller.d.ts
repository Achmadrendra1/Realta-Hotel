import { AddressService } from 'src/Service/Master/address/address.service';
import { Address } from 'src/entities/Address';
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    addressName(params: any): Promise<any>;
    addressProvinces(params: any): Promise<any>;
    addressHotel(params: any): Promise<any>;
    addressUser(params: any): Promise<any>;
    create(data: Address): Promise<"failed add to address" | "success add to address">;
    update(params: any, data: any): Promise<any>;
    remove(params: any): " success deleted" | " gagal";
}
