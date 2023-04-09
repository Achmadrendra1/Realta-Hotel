import { OrderMenuDetail } from 'src/entities/OrderMenuDetail';
import { OrderMenus } from 'src/entities/OrderMenus';
import { Repository } from 'typeorm';
export declare class OrderMenusService {
    private orderMenuRepository;
    private orderDetailRepository;
    constructor(orderMenuRepository: Repository<OrderMenus>, orderDetailRepository: Repository<OrderMenuDetail>);
    getOrderMenus(): Promise<OrderMenus[]>;
    getOrderNumber(data: any): Promise<any>;
    getCodeDesc(): Promise<OrderMenus>;
    getCode(): Promise<OrderMenus[]>;
    addOrderMenus(data: OrderMenus): Promise<any>;
    deleteOrder(param: any): Promise<import("typeorm").DeleteResult>;
}
