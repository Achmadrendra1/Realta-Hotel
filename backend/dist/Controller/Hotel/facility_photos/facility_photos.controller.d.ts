/// <reference types="multer" />
import { FacilityPhotosService } from '../../../Service/Hotel/facility_photos/facility_photos.service';
export declare class FacilityPhotosController {
    private FaphoService;
    constructor(FaphoService: FacilityPhotosService);
    getFapho(): Promise<any>;
    getPhoto(filename: string, res: any): any;
    getFaphoId(id: any): Promise<any>;
    UpdateFapho(hotelId: any, body: any): Promise<any>;
    addFapho(file: Express.Multer.File, body: any): Promise<string | {
        message: string;
        result: import("../../../entities/FacilityPhoto").FacilityPhoto[];
    }>;
    DeleteFapho(id: any): Promise<void>;
}
