import { Proviences } from "./Proviences";
import { Hotels } from "./Hotels";
import { UserProfiles } from "./UserProfiles";
export declare class Address {
    addrId: number;
    addrLine1: string | null;
    addrLine2: string | null;
    addrPostalCode: string | null;
    addrSpatialLocation: object | null;
    addrProv: Proviences;
    hotels: Hotels[];
    userProfiles: UserProfiles[];
}
