import { UserBonusPointsService } from 'src/Service/Users/user-bonus-points/user-bonus-points.service';
import { UserBonusPoints } from 'src/entities/UserBonusPoints';
export declare class UserBonusPointsController {
    private readonly userBonusPointsService;
    constructor(userBonusPointsService: UserBonusPointsService);
    create(item: UserBonusPoints): Promise<any>;
    findAll(): Promise<UserBonusPoints[]>;
    update(id: string, items: UserBonusPoints): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
