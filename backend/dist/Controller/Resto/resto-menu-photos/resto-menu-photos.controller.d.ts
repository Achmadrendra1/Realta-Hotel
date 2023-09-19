/// <reference types="multer" />
import { RestoMenuPhotosService } from 'src/Service/Resto/resto-menu-photos/resto-menu-photos.service';
export declare class RestoMenuPhotosController {
    private readonly restoMenuPhotos;
    constructor(restoMenuPhotos: RestoMenuPhotosService);
    getMenuPhoto(): Promise<any>;
    getListPhoto(param: any): Promise<any>;
    addMenuPhoto(file: Express.Multer.File, body: any): Promise<import("typeorm").InsertResult>;
    addMultiplePhoto(rempUrl: Array<Express.Multer.File>, body: any): Promise<string>;
    editPrimary(body: any): Promise<string>;
    deleteMenuPhoto(param: any): Promise<void>;
}
