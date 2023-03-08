import { Injectable } from '@nestjs/common';
import { BookingOrders } from 'src/entities/BookingOrders';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Enum from 'src/DataEnum';

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

@Injectable()
export class BookingOrdersService {
  constructor(
    @InjectRepository(BookingOrders)
    private bookingOrdersRepository: Repository<BookingOrders>,
  ) {}

  async findLastBooking(): Promise<any> {
    return await this.bookingOrdersRepository.query(
      'SELECT * FROM booking.booking_orders ORDER BY boor_id DESC LIMIT 1',
    );
  }

  async findAll(): Promise<any> {
    return await this.bookingOrdersRepository.find();
  }

  async findById(id: number): Promise<any> {
    return await this.bookingOrdersRepository.find({
      where: {
        boorId: id,
      },
    });
  }

  async createBookingOrdersFinal(data: dataBooking): Promise<any> {
    return await this.bookingOrdersRepository
      .query(
        `CALL booking.insertbooking (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
            )`,
        [
          data.boor_user_id,
          data.boor_hotel_id,
          data.boor_order_number,
          data.boor_order_date,
          data.boor_arrival_date,
          data.boor_total_room,
          data.boor_total_guest,
          data.boor_discount,
          data.boor_total_tax,
          data.boor_total_amount,
          data.boor_down_payment,
          data.boor_pay_type,
          data.boor_is_paid,
          data.boor_type,
          data.boor_cardnumber,
          data.boor_member_type,
          data.boor_status,
          data.borde_checkin,
          data.borde_checkout,
          data.borde_adults,
          data.borde_kids,
          data.borde_price,
          data.borde_extra,
          data.borde_discount,
          data.borde_tax,
          data.borde_subtotal,
          data.borde_faci_id,
          data.soco_spof_id,
        ],
      )
      .then((result) => {
        // console.log(result)
        return {
          messeage: `Selamat anda berhasil menambahkan Booking Orders`,
          return: result,
        };
      })
      .catch((err) => {
        console.log(err)
        // return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async createBookingOrders(field: BookingOrders): Promise<any> {
    return await this.bookingOrdersRepository
      .save({
        boorOrderNumber: field.boorOrderNumber,
        boorOrderDate: field.boorOrderDate,
        boorArrivalDate: field.boorArrivalDate,
        boorTotalRoom: field.boorTotalRoom,
        boorTotalGuest: field.boorTotalGuest,
        boorDiscount: field.boorDiscount,
        boorTotalTax: field.boorTotalTax,
        boorTotalAmount: field.boorTotalAmount,
        boorDownPayment: field.boorDownPayment,
        boorPayType: Enum.PayType[field.boorPayType],
        boorIsPaid: Enum.IsPaid[field.boorIsPaid],
        boorType: Enum.BonusType[field.boorType],
        boorCardnumber: field.boorCardnumber,
        boorStatus: field.boorStatus,
        boorUser: field.boorUser,
        boorHotel: field.boorHotel,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil menambahkan Booking Orders`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async updateBookingOrders(id: number, field: BookingOrders): Promise<any> {
    return await this.bookingOrdersRepository
      .update(
        {
          boorId: id,
        },
        {
          boorOrderNumber: field.boorOrderNumber,
          boorOrderDate: field.boorOrderDate,
          boorArrivalDate: field.boorArrivalDate,
          boorTotalRoom: field.boorTotalRoom,
          boorTotalGuest: field.boorTotalGuest,
          boorDiscount: field.boorDiscount,
          boorTotalTax: field.boorTotalTax,
          boorTotalAmount: field.boorTotalAmount,
          boorDownPayment: field.boorDownPayment,
          boorPayType: Enum.PayType[field.boorPayType],
          boorIsPaid: Enum.IsPaid[field.boorIsPaid],
          boorType: Enum.BonusType[field.boorType],
          boorCardnumber: field.boorCardnumber,
          boorStatus: field.boorStatus,
          boorUser: field.boorUser,
          boorHotel: field.boorHotel,
        },
      )
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil sunting booking orders`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async deleteBookingOrders(id: number): Promise<any> {
    return await this.bookingOrdersRepository
      .delete({
        boorId: id,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil hapus data`,
          return: result,
        };
      });
  }

  //Get hotel untuk Booking
  async findSpHotel(): Promise<any> {
    return await this.bookingOrdersRepository.query(
      'select * from hotel.viewHotel',
    );
  }

    
    //Sp Get Facilities untuk Booking
    async findSpFacility():Promise<any> {
        return await this.bookingOrdersRepository.query('Select * from hotel.viewRoom')
    }

    //Get UserReview untuk Booking
    async findSpReview() {
        return await this.bookingOrdersRepository.query('Select * From hotel.userreview')
    }

    async getInvoice () {
        return await this.bookingOrdersRepository.query('select * from booking.getbookinginvoice')
    }
}
