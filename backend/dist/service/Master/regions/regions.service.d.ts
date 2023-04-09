import { Repository } from 'typeorm';
import { Regions } from 'src/entities/Regions';
import { Country } from 'src/entities/Country';
import { Proviences } from 'src/entities/Proviences';
import { Address } from 'src/entities/Address';
interface dataLocations {
    regionCode: any;
    regionName: any;
    countryId: any;
    countryName: any;
    countryRegion: any;
    provId: any;
    provName: any;
    addresses: any;
    provCountry: any;
    addrId: any;
    addrLine1: any;
    addrLine2: any;
    addrPostalCode: any;
    addrSpatialLocation: any;
    addrProv: any;
    hotels: any;
    userProfiles: any;
}
export declare class RegionsService {
    private regionsRepository;
    private countryRepository;
    private provincesRepository;
    private addressRepository;
    constructor(regionsRepository: Repository<Regions>, countryRepository: Repository<Country>, provincesRepository: Repository<Proviences>, addressRepository: Repository<Address>);
    getLocation(): Promise<any>;
    getLocationRC(): Promise<any>;
    getLocationRCP(): Promise<any>;
    createRC(data: dataLocations): Promise<void>;
    createRCP(data: dataLocations): Promise<void>;
    createRCPA(data: dataLocations): Promise<void>;
    findAllRegions(): Promise<any>;
    findOneRegions(regionCode: number): Promise<any>;
    createRegions(data: Regions): Promise<Regions>;
    updateRegions(regionCode: number, data: any): Promise<Regions>;
    deleteRegions(regionCode: number): Promise<any>;
}
export {};
