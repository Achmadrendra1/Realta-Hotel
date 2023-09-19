import { UsersService } from '../Users/users/users.service';
export declare class AuthService {
    private UserService;
    constructor(UserService: UsersService);
    Login(userEmail: any, password: any): Promise<any>;
}
