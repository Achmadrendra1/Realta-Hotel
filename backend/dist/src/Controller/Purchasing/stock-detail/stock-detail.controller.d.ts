import { StodService } from '../../../Service/Purchasing/stock-detail/stock-detail.service';
export declare class StodController {
    private stodService;
    constructor(stodService: StodService);
    getStod(): Promise<any>;
    getStodId(params: any): Promise<any>;
    createStod(body: any): Promise<any>;
    updateStod(params: any, body: any): Promise<any>;
    deleteStod(params: any): Promise<any>;
}
