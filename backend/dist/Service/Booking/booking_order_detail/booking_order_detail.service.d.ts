import { Repository } from 'typeorm';
import { BookingOrderDetail } from 'src/entities/BookingOrderDetail';
export declare class BookingOrderDetailService {
    private bookingOrderDetail;
    constructor(bookingOrderDetail: Repository<BookingOrderDetail>);
    findAll(): Promise<any>;
    findAllId(id: number): Promise<any>;
    findLastBookingDetail(): Promise<any>;
    createBookingOrderDetail(field: BookingOrderDetail): Promise<any>;
    updateBookingOrderDetail(id: number, field: BookingOrderDetail): Promise<any>;
    deleteBookingOrderDetail(id: number): Promise<any>;
}
