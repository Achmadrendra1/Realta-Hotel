import { UserAccountService } from 'src/Service/Payment/user-account/user-account.service';
export declare class UserAccountController {
    private accountService;
    constructor(accountService: UserAccountService);
    getAllData(): Promise<import("../../../entities/UserAccounts").UserAccounts[]>;
    getPaga(params: any): Promise<import("../../../entities/UserAccounts").UserAccounts[]>;
    getJoin(): Promise<import("../../../entities/UserAccounts").UserAccounts[]>;
    getByAccNumber(body: any): Promise<import("../../../entities/UserAccounts").UserAccounts>;
    createAcc(body: any): Promise<{
        message: string;
        result: import("../../../entities/UserAccounts").UserAccounts[];
    }>;
    checkSecure(body: any): Promise<{
        status: true;
        message: string;
    }>;
    updateSecureCode(body: any): Promise<{
        message: string;
    } | {
        error: any;
    }>;
    updateAcc(body: any): Promise<{
        message: string;
        result: import("../../../entities/UserAccounts").UserAccounts;
    }>;
    deleteAcc(params: any): Promise<string>;
}
