import { Address } from "./Address";
import { Users } from "./Users";
export declare class UserProfiles {
    usproId: number;
    usproNationalId: string | null;
    usproBirtDate: string | null;
    usproJobTitle: string | null;
    usproMartialStatus: string | null;
    usproGender: string | null;
    usproAddr: Address;
    usproUser: Users;
}
