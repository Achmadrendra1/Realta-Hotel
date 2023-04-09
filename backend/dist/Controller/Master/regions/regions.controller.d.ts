import { RegionsService } from 'src/Service/Master/regions/regions.service';
import { Regions } from 'src/entities/Regions';
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
export declare class RegionsController {
    private RegionsService;
    constructor(RegionsService: RegionsService);
    getLocation(): Promise<any>;
    getLocationRC(): Promise<any>;
    getLocationRCP(): Promise<any>;
    createCountry(data: dataLocations): Promise<void>;
    createProvinces(data: dataLocations): Promise<void>;
    createAddress(data: dataLocations): Promise<void>;
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    createRegions(data: Regions): Promise<"failed insert to regions" | " success insert to regions">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): " gagal" | "data hasbeen deleted ";
}
export {};
