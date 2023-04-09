import { UserPassword } from 'src/entities/UserPassword';
import { Repository } from 'typeorm';
interface Change {
    uspa_user_id: any;
    uspa_passwordhash: any;
    new_password: any;
    old_password: any;
}
export declare class UserPasswordService {
    private readonly UserPasswordRepository;
    constructor(UserPasswordRepository: Repository<UserPassword>);
    findById(id: any): Promise<any>;
    ChangePassword(id: any, item: Change): Promise<any>;
}
export {};
