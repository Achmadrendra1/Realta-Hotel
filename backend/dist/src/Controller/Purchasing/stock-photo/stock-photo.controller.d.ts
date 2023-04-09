/// <reference types="multer" />
import { SphoService } from '../../../service/Purchasing/stock-photo/stock-photo.service';
export declare class SphoController {
    private sphoService;
    constructor(sphoService: SphoService);
    getSpho(): Promise<any>;
    getSphoFile(filename: string, res: any): any;
    getSphoId(params: any): Promise<any>;
    getSphoName(params: any): Promise<any>;
    createSpho(file: Express.Multer.File, body: any): Promise<any>;
    updateSpho(params: any, body: any): Promise<any>;
    deleteSpho(params: any): Promise<any>;
}
