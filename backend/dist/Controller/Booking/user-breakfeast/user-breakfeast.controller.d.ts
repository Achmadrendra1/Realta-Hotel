import { UserBreakfeastService } from '../../../Service/Booking/user-breakfeast/user-breakfeast.service';
export declare class UserBreakfeastController {
    private readonly UserBreakfeastService;
    constructor(UserBreakfeastService: UserBreakfeastService);
    findAllUserBreakfeast(): Promise<any>;
    findAllId(params: any): Promise<any>;
    createUserBreakfeast(body: any): Promise<any>;
    updateUserBreakfeast(params: any, body: any): Promise<any>;
    deleteUserBreakfeast(params: any): Promise<{
        messeage: string;
        return: import("typeorm").DeleteResult;
    }>;
}
