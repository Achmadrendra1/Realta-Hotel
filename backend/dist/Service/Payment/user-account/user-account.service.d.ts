import { UserAccounts } from 'src/entities/UserAccounts';
import { Repository } from 'typeorm';
export declare class UserAccountService {
    private uacRepository;
    constructor(uacRepository: Repository<UserAccounts>);
    getAll(): Promise<UserAccounts[]>;
    getAccount(id: any): Promise<UserAccounts[]>;
    getDataWithJoin(): Promise<UserAccounts[]>;
    getByAccNumber(accNumber: string): Promise<UserAccounts>;
    createAccount(items: UserAccounts): Promise<{
        message: string;
        result: UserAccounts[];
    }>;
    updateAccount(accNumber: string, items: UserAccounts): Promise<{
        message: string;
        result: UserAccounts;
    }>;
    deleteAccount(accNumber: any): Promise<string>;
    updateSecureCode(items: any): Promise<{
        message: string;
    } | {
        error: any;
    }>;
    checkSecureCode(items: any): Promise<{
        status: true;
        message: string;
    }>;
}
