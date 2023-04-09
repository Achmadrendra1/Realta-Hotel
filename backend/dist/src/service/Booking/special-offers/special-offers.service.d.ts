import { SpecialOffers } from 'src/entities/SpecialOffers';
import { Repository } from 'typeorm';
export declare class SpecialOffersService {
    private SpecialOffersRepository;
    constructor(SpecialOffersRepository: Repository<SpecialOffers>);
    findAll(): Promise<any>;
    findAllId(id: number): Promise<any>;
    createSpecialOffers(field: SpecialOffers): Promise<any>;
    updateSpecialOffers(id: number, field: SpecialOffers): Promise<any>;
    deleteSpecialOffers(id: number): Promise<{
        messeage: string;
        return: import("typeorm").DeleteResult;
    }>;
}
