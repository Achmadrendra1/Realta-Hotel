import { BookingOrderDetailExtraService } from '../../../Service/Booking/booking-order-detail-extra/booking-order-detail-extra.service';
export declare class BookingOrderDetailExtraController {
    private readonly BookingOrderDetailExtraService;
    constructor(BookingOrderDetailExtraService: BookingOrderDetailExtraService);
    findAllBookingOrderDetailExtra(): Promise<any>;
    findAllId(params: any): Promise<any>;
    createBookingOrderDetailExtra(body: any): Promise<any>;
    createExtraMultiple(body: any): Promise<void>;
    updateBookingOrderDetailExtra(params: any, body: any): Promise<any>;
    deleteBookingOrderDetailExtra(params: any): Promise<any>;
}
