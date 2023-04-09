import { Repository } from 'typeorm';
import { Country } from 'src/entities/Country';
export declare class CountryService {
    private countryRepository;
    constructor(countryRepository: Repository<Country>);
    findAllCountry(): Promise<any>;
    findOneCountry(countryId: number): Promise<any>;
    createCountry(data: any): Promise<Country>;
    updateCountry(countryId: number, data: any): Promise<Country>;
    deleteCountry(countryId: number): Promise<any>;
}
