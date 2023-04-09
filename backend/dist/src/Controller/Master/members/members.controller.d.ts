import { MembersService } from '../../../Service/Master/members/members.service';
import { Members } from '../../../entities/Members';
export declare class MembersController {
    private MembersService;
    constructor(MembersService: MembersService);
    findall(): Promise<any>;
    findById(params: any): Promise<any>;
    priceName(params: any): Promise<any>;
    createMembers(data: Members): Promise<"failed insert to regions" | " success insert to regions">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): Promise<any>;
}
