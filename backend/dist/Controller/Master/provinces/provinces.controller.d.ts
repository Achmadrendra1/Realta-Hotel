import { ProvincesService } from 'src/Service/Master/provinces/provinces.service';
import { Proviences } from 'src/entities/Proviences';
export declare class ProvincesController {
    private ProvincesService;
    constructor(ProvincesService: ProvincesService);
    findall(): Promise<any>;
    findById(id: number): Promise<any>;
    createProviences(data: Proviences): Promise<"failed insert to regions" | " success insert to regions">;
    update(params: any, body: any): Promise<any>;
    remove(params: any): "data hasbeen deleted" | "gagal";
}
