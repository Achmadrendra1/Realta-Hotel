import { BookingOrderDetailService } from '../../../Service/Booking/booking_order_detail/booking_order_detail.service';
export declare class BookingOrderDetailController {
    private readonly BookingOrderDetailService;
    constructor(BookingOrderDetailService: BookingOrderDetailService);
    findAllBookingOrderDetail(): Promise<any>;
    findLastBookingDetail(): Promise<any>;
    findAllId(params: any): Promise<any>;
    createBookingOrderDetail(body: any): Promise<any>;
    updateBookingOrderDetail(params: any, body: any): Promise<any>;
    deleteBookingOrderDetail(params: any): Promise<any>;
}
