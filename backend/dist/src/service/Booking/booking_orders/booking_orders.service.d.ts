import { BookingOrders } from 'src/entities/BookingOrders';
import { Repository } from 'typeorm';
interface dataBooking {
    boor_user_id: any;
    boor_hotel_id: any;
    boor_order_number: any;
    boor_order_date: any;
    boor_arrival_date: any;
    boor_total_room: any;
    boor_total_guest: any;
    boor_discount: any;
    boor_total_tax: any;
    boor_total_amount: any;
    boor_down_payment: any;
    boor_pay_type: any;
    boor_is_paid: any;
    boor_type: any;
    boor_cardnumber: any;
    boor_member_type: any;
    boor_status: any;
    borde_checkin: any;
    borde_checkout: any;
    borde_adults: any;
    borde_kids: any;
    borde_price: any;
    borde_extra: any;
    borde_discount: any;
    borde_tax: any;
    borde_subtotal: any;
    borde_faci_id: any;
    soco_spof_id: any;
}
export declare class BookingOrdersService {
    private bookingOrdersRepository;
    constructor(bookingOrdersRepository: Repository<BookingOrders>);
    findLastBooking(): Promise<any>;
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    createBookingOrdersFinal(data: dataBooking): Promise<any>;
    createBookingOrders(field: BookingOrders): Promise<any>;
    updateBookingOrders(id: number, field: BookingOrders): Promise<any>;
    deleteBookingOrders(id: number): Promise<any>;
    findSpHotel(): Promise<any>;
    findSpFacility(): Promise<any>;
    findSpReview(): Promise<any>;
    getInvoice(): Promise<any>;
}
export {};
