import { RestoMenuPhotos } from 'src/entities/RestoMenuPhotos';
import { Repository } from 'typeorm';
export declare class RestoMenuPhotosService {
    private restoMenuPhotoRepository;
    constructor(restoMenuPhotoRepository: Repository<RestoMenuPhotos>);
    getMenuPhotos(): Promise<any>;
    getListPhoto(param: any): Promise<any>;
    addMenuPhoto(file: any, body: any): Promise<import("typeorm").InsertResult>;
    addMultiplePhoto(files: any, body: any): Promise<string>;
    editPrimary(data: any): Promise<string>;
    editMenuPhoto(file: any, body: any, param: any): Promise<import("typeorm").UpdateResult>;
    deleteMenuPhoto(param: any): Promise<void>;
}
