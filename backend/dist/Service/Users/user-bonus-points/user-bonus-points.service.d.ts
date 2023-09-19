import { UserBonusPoints } from 'src/entities/UserBonusPoints';
import { Repository } from 'typeorm';
export declare class UserBonusPointsService {
    private userBonusPointsRepository;
    constructor(userBonusPointsRepository: Repository<UserBonusPoints>);
    create(items: UserBonusPoints): Promise<any>;
    findAll(): Promise<UserBonusPoints[]>;
    update(id: number, items: UserBonusPoints): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
}
