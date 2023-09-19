import { UsersService } from 'src/Service/Users/users/users.service';
export declare class UsersController {
    private UsersService;
    constructor(UsersService: UsersService);
    findAll(): Promise<any>;
    findByEmail(email: string): Promise<any>;
    updateProfile(id: string, Body: any): Promise<any>;
    register(data: any): Promise<any>;
    Delete(id: string): Promise<void>;
}
