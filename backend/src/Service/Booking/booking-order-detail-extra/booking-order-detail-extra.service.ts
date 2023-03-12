import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetailExtra } from 'src/entities/BookingOrderDetailExtra';
import { Repository } from 'typeorm';

@Injectable()
export class BookingOrderDetailExtraService {
  constructor(
    @InjectRepository(BookingOrderDetailExtra)
    private bookingOrderDetailExtra: Repository<BookingOrderDetailExtra>,
  ) {}
  async findAll(): Promise<any> {
    return await this.bookingOrderDetailExtra.find();
  }

  async findAllId(id: number): Promise<any> {
    return await this.bookingOrderDetailExtra.find({
      where: {
        boexId: id,
      },
    });
  }

  async createExtraMultiple(body : any) {
    body.map(async (body : any)=> {
      const extraDetail = new BookingOrderDetailExtra()
      extraDetail.boexPrit = body.pritId
      extraDetail.boexPrice = body.boexPrice
      extraDetail.boexQty = body.boexQty
      extraDetail.boexSubtotal = body.boexSubtotal
      extraDetail.boexMeasureUnit = body.boexMeasure
      extraDetail.boexBorde = body.bordeId
      return await this.bookingOrderDetailExtra.save(extraDetail)
    })
  }

  async createBookingOrderDetailExtra(
    field: BookingOrderDetailExtra,
  ): Promise<any> {
    return await this.bookingOrderDetailExtra
      .save({
        boexPrice: field.boexPrice,
        boexQty: field.boexQty,
        boexSubtotal: field.boexSubtotal,
        boexMeasureUnit: field.boexMeasureUnit,
        boexBorde: field.boexBorde,
        boexPrit: field.boexPrit,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil menambahkan Booking Order Detail Extra`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async updateBookingOrderDetailExtra(
    id: number,
    field: BookingOrderDetailExtra,
  ): Promise<any> {
    return await this.bookingOrderDetailExtra
      .update(
        {
          boexId: id,
        },
        {
          boexPrice: field.boexPrice,
          boexQty: field.boexQty,
          boexSubtotal: field.boexSubtotal,
          boexMeasureUnit: field.boexMeasureUnit,
          boexBorde: field.boexBorde,
          boexPrit: field.boexPrit,
        },
      )
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil sunting Booking Order Detail Extra`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async deleteBookingOrderDetailExtra(id: number): Promise<any> {
    return await this.bookingOrderDetailExtra
      .delete({
        boexId: id,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil hapus data`,
          return: result,
        };
      });
  }
}
