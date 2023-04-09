import { Entitys } from "./Entitys";
import { Users } from "./Users";
export declare class UserAccounts {
    usacEntityId: number;
    usacUserId: number;
    usacAccountNumber: string | null;
    usacSaldo: string | null;
    usacType: string | null;
    usacExpmonth: number | null;
    usacExpyear: number | null;
    usacSecureCode: string | null;
    usacModifiedDate: Date | null;
    usacEntity: Entitys;
    usacUser: Users;
}
