import { FacilityPhoto } from 'src/entities/FacilityPhoto';
import { Repository } from 'typeorm';
export declare class FacilityPhotosService {
    private FaphoRepsitory;
    constructor(FaphoRepsitory: Repository<FacilityPhoto>);
    findAllFapho(): Promise<any>;
    findByFaphoId(id: any): Promise<any>;
    addNewFapho(file: any, fapho: any): Promise<string | {
        message: string;
        result: FacilityPhoto[];
    }>;
    UpdateFapho(id: number, fapho: FacilityPhoto): Promise<any>;
    deleteFapho(id: FacilityPhoto): Promise<void>;
}
