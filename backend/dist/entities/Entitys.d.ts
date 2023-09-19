import { Bank } from "./Bank";
import { PaymentGateway } from "./PaymentGateway";
import { UserAccounts } from "./UserAccounts";
export declare class Entitys {
    entityId: number;
    bank: Bank;
    paymentGateway: PaymentGateway;
    userAccounts: UserAccounts[];
}
