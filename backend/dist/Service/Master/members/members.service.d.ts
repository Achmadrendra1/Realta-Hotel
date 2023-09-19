import { Repository } from 'typeorm';
import { Members } from 'src/entities/Members';
export declare class MembersService {
    private membersRepository;
    constructor(membersRepository: Repository<Members>);
    findAllMembers(): Promise<any>;
    findOneMembers(membName: any): Promise<any>;
    getMemberByuser(name: any): Promise<any>;
    getMemberByName(name: string): Promise<any>;
    createMembers(data: Members): Promise<Members>;
    updateMembers(membName: any, data: Members): Promise<any>;
    deleteMembers(membName: any): Promise<any>;
}
