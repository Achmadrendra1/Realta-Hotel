import { AuthService } from '../../Service/Auth/auth.service';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    Insert(body: any): Promise<any>;
    verif(params: any): Promise<any>;
}
