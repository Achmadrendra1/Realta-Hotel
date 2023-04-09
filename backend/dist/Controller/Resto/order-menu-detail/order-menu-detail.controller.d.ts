import { OrderMenuDetailService } from 'src/Service/Resto/order-menu-detail/order-menu-detail.service';
export declare class OrderMenuDetailController {
    private readonly orderMenuDetailService;
    constructor(orderMenuDetailService: OrderMenuDetailService);
    getAll(): Promise<import("../../../entities/OrderMenuDetail").OrderMenuDetail[]>;
    addOrderMenuDetail(data: any): Promise<import("typeorm").InsertResult>;
}
