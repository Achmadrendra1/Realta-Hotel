import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingOrderDetail } from 'src/entities/BookingOrderDetail';

@Injectable()
export class BookingOrderDetailService {
  constructor(
    @InjectRepository(BookingOrderDetail)
    private bookingOrderDetail: Repository<BookingOrderDetail>,
  ) {}

  async findAll(): Promise<any> {
    return await this.bookingOrderDetail.find();
  }

  async findAllId(id: number): Promise<any> {
    return await this.bookingOrderDetail.find({
      where: {
        bordeId: id,
      },
    });
  }

  async findLastBookingDetail(): Promise<any> {
    return await this.bookingOrderDetail.query(
      'SELECT * FROM booking.booking_order_detail ORDER BY borde_id DESC LIMIT 1',
    );
  }

  async createBookingOrderDetail(field: BookingOrderDetail): Promise<any> {
    return await this.bookingOrderDetail
      .save({
        borderBoorId: field.borderBoorId,
        bordeCheckin: field.bordeCheckin,
        bordeCheckout: field.bordeCheckout,
        bordeAdults: field.bordeAdults,
        bordeKids: field.bordeKids,
        bordePrice: field.bordePrice,
        bordeExtra: field.bordeExtra,
        bordeDiscount: field.bordeDiscount,
        bordeTax: field.bordeTax,
        bordeSubtotal: field.bordeSubtotal,
        bordeFaci: field.bordeFaci,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil masukan booking order detail`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukkan` + err;
      });
  }

  async updateBookingOrderDetail(
    id: number,
    field: BookingOrderDetail,
  ): Promise<any> {
    return await this.bookingOrderDetail
      .update(
        {
          bordeId: id,
        },
        {
          borderBoorId: field.borderBoorId,
          bordeCheckin: field.bordeCheckin,
          bordeCheckout: field.bordeCheckout,
          bordeAdults: field.bordeAdults,
          bordeKids: field.bordeKids,
          bordePrice: field.bordePrice,
          bordeExtra: field.bordeExtra,
          bordeDiscount: field.bordeDiscount,
          bordeTax: field.bordeTax,
          bordeSubtotal: field.bordeSubtotal,
          bordeFaci: field.bordeFaci,
        },
      )
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil sunting booking order detail`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async deleteBookingOrderDetail(id: number): Promise<any> {
    return await this.bookingOrderDetail
      .delete({
        bordeId: id,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil hapus data`,
          return: result,
        };
      });
  }
}
