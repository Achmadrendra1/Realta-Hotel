import { UserPasswordService } from 'src/Service/Users/user-password/userPassword.service';
export declare class UsersPasswordController {
    private UsersPassword;
    constructor(UsersPassword: UserPasswordService);
    findById(id: string): Promise<any>;
    ChangePassword(id: string, newPassword: any): Promise<any>;
}
