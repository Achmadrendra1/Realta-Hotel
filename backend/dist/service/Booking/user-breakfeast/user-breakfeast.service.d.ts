import { UserBreakfeast } from 'src/entities/UserBreakfeast';
import { Repository } from 'typeorm';
export declare class UserBreakfeastService {
    private userBreakfeastRepository;
    constructor(userBreakfeastRepository: Repository<UserBreakfeast>);
    findAll(): Promise<any>;
    findAllId(id: number): Promise<any>;
    createUserBreakfeast(field: UserBreakfeast): Promise<any>;
    updateUserBreakfeast(id: number, field: UserBreakfeast): Promise<any>;
    deleteUserBreakfeast(id: number): Promise<{
        messeage: string;
        return: import("typeorm").DeleteResult;
    }>;
}
