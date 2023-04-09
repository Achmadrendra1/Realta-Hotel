import { OrderMenuDetail } from 'src/entities/OrderMenuDetail';
import { Repository } from 'typeorm';
export declare class OrderMenuDetailService {
    private orderMenuDetailRepository;
    constructor(orderMenuDetailRepository: Repository<OrderMenuDetail>);
    getAll(): Promise<OrderMenuDetail[]>;
    addOrderMenuDetail(data: OrderMenuDetail): Promise<import("typeorm").InsertResult>;
}
