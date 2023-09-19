import { OrderMenusService } from 'src/Service/Resto/order-menus/order-menus.service';
export declare class OrderMenusController {
    private readonly orderMenusService;
    constructor(orderMenusService: OrderMenusService);
    getOrderMenus(): Promise<import("../../../entities/OrderMenus").OrderMenus[]>;
    getCodeDesc(): Promise<import("../../../entities/OrderMenus").OrderMenus>;
    getOrderNumber(data: any): Promise<any>;
    getCode(): Promise<import("../../../entities/OrderMenus").OrderMenus[]>;
    addOrderMenus(body: any): Promise<any>;
    deleteOrder(param: any): Promise<import("typeorm").DeleteResult>;
}
