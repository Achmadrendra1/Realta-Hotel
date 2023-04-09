import { Repository } from 'typeorm';
import { Address } from 'src/entities/Address';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    findAllAddress(): Promise<any>;
    findOneAddress(addrId: number): Promise<any>;
    getAddressByName(name: string): Promise<Address[]>;
    getAddressByProvinces(name: string): Promise<any>;
    getAddressByHotel(name: string): Promise<any>;
    getAddressByUser(name: string): Promise<any>;
    createAddress(data: any): Promise<Address>;
    updateAddress(addrId: number, data: any): Promise<Address>;
    deleteAddress(addrId: number): Promise<any>;
}
