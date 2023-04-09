import { BookingOrdersService } from '../../../Service/Booking/booking_orders/booking_orders.service';
import { HotelsService } from '../../../Service/Hotel/hotels/hotels.service';
export declare class BookingOrdersController {
    private readonly BookingOrdersService;
    private hotelsService;
    constructor(BookingOrdersService: BookingOrdersService, hotelsService: HotelsService);
    findAllBookingOrders(): Promise<any>;
    getSpHotel(): Promise<any>;
    getSpFacility(): Promise<any>;
    getSpReview(): Promise<any>;
    findAllId(params: any): Promise<any>;
    findLastBooking(): Promise<any>;
    findInvoice(): Promise<any>;
    createBookingOrdersFinal(body: any): Promise<any>;
    createBookingOrders(body: any): Promise<any>;
    updateBookingOrders(params: any, body: any): Promise<any>;
    deleteBookingOrders(params: any): Promise<any>;
}
