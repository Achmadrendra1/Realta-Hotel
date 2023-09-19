import { CountryService } from 'src/Service/Master/country/country.service';
import { Country } from 'src/entities/Country';
export declare class CountryController {
    private CountryService;
    constructor(CountryService: CountryService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    create(data: Country): Promise<" failed insert to country" | " success insert to country">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): "data hasbeen deleted" | "gagal";
}
