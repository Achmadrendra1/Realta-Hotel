import { BookingOrderDetailExtra } from 'src/entities/BookingOrderDetailExtra';
import { Repository } from 'typeorm';
export declare class BookingOrderDetailExtraService {
    private bookingOrderDetailExtra;
    constructor(bookingOrderDetailExtra: Repository<BookingOrderDetailExtra>);
    findAll(): Promise<any>;
    findAllId(id: number): Promise<any>;
    createExtraMultiple(body: any): Promise<void>;
    createBookingOrderDetailExtra(field: BookingOrderDetailExtra): Promise<any>;
    updateBookingOrderDetailExtra(id: number, field: BookingOrderDetailExtra): Promise<any>;
    deleteBookingOrderDetailExtra(id: number): Promise<any>;
}
