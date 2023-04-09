import { Users } from "./Users";
export declare class PaymentTransaction {
    patrId: number;
    patrTrxId: string | null;
    patrDebet: string | null;
    patrCredit: string | null;
    patrType: string | null;
    patrNote: string | null;
    patrModifiedDate: Date | null;
    patrOrderNumber: string | null;
    patrSourceId: string | null;
    patrTargetId: string | null;
    patrTrxNumberRef: string | null;
    patrUser: Users;
}
