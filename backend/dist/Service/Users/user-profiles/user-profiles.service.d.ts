import { UserProfiles } from 'src/entities/UserProfiles';
import { Repository } from 'typeorm';
export declare class UserProfilesService {
    private readonly userProfilesRepository;
    constructor(userProfilesRepository: Repository<UserProfiles>);
    create(item: UserProfiles): Promise<{
        message: string;
        result: {
            usproId: number;
            usproNationalId: string;
            usproBirtDate: string;
            usproJobTitle: string;
            usproMartialStatus: any;
            usproGender: any;
            usproAddr: import("../../../entities/Address").Address;
            usproUser: import("../../../entities/Users").Users;
        } & UserProfiles;
    }>;
    findAll(): Promise<UserProfiles[]>;
    update(id: number, item: UserProfiles): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
