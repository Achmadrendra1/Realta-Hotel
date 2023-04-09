import { Repository } from 'typeorm';
import { Proviences } from 'src/entities/Proviences';
export declare class ProvincesService {
    private proviencesRepository;
    constructor(proviencesRepository: Repository<Proviences>);
    findAllProviences(): Promise<any>;
    findOneProviences(provId: number): Promise<any>;
    createProviences(data: any): Promise<Proviences>;
    updateProviences(provId: number, data: any): Promise<Proviences>;
    deleteProviences(provId: number): Promise<any>;
}
