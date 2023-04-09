import { UserProfilesService } from 'src/Service/Users/user-profiles/user-profiles.service';
import { UserProfiles } from 'src/entities/UserProfiles';
export declare class UserProfilesController {
    private readonly userProfilesService;
    constructor(userProfilesService: UserProfilesService);
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
    update(id: string, item: UserProfiles): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
