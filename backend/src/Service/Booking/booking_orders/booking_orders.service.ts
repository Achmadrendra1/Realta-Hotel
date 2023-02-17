import { Injectable } from '@nestjs/common';
import { BookingOrders } from 'src/entities/BookingOrders';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Enum from 'src/DataEnum'

@Injectable()
export class BookingOrdersService {
    constructor(@InjectRepository(BookingOrders)
    private bookingOrdersRepository : Repository <BookingOrders>){
    }
    
    async findAll() : Promise <any> {
        return await this.bookingOrdersRepository.find()
    }

    async findById(id : number) : Promise <any> {
        return await this.bookingOrdersRepository.find(
            {
                where : {
                    boorId : id
                }
            }
        )
    }

    async createBookingOrders(field : BookingOrders) : Promise <any> {
        return await this.bookingOrdersRepository.save({
            boorOrderNumber : field.boorOrderNumber,
            boorOrderDate   : field.boorOrderDate,
            boorArrivalDate : field.boorArrivalDate,
            boorTotalRoom   : field.boorTotalRoom,
            boorTotalGuest  : field.boorTotalGuest,
            boorDiscount    : field.boorDiscount,
            boorTotalTax    : field.boorTotalTax,
            boorTotalAmount : field.boorTotalAmount,
            boorDownPayment : field.boorDownPayment,
            boorPayType     : Enum.PayType[field.boorPayType],
            boorIsPaid      : Enum.IsPaid[field.boorIsPaid],
            boorType        : Enum.BonusType[field.boorType],
            boorCardnumber  : field.boorCardnumber,
            boorStatus      : field.boorStatus,
            boorUser        : field.boorUser,
            boorHotel       : field.boorHotel
        }).then((result) => {
            return ({messeage : `Selamat anda berhasil menambahkan Booking Orders`,
            return : result
            })
        }).catch((err)=>{
            return (`Maaf, ada kesalahan masukan` + err)
        })
    }

    async updateBookingOrders(id : number, field : BookingOrders) : Promise <any> {
        return await this.bookingOrdersRepository.update({
            boorId : id,
        },{
            boorOrderNumber : field.boorOrderNumber,
            boorOrderDate   : field.boorOrderDate,
            boorArrivalDate : field.boorArrivalDate,
            boorTotalRoom   : field.boorTotalRoom,
            boorTotalGuest  : field.boorTotalGuest,
            boorDiscount    : field.boorDiscount,
            boorTotalTax    : field.boorTotalTax,
            boorTotalAmount : field.boorTotalAmount,
            boorDownPayment : field.boorDownPayment,
            boorPayType     : Enum.PayType[field.boorPayType],
            boorIsPaid      : Enum.IsPaid[field.boorIsPaid],
            boorType        : Enum.BonusType[field.boorType],
            boorCardnumber  : field.boorCardnumber,
            boorStatus      : field.boorStatus,
            boorUser        : field.boorUser,
            boorHotel       : field.boorHotel
        }).then((result) => {
            return {
                messeage : `Selamat anda berhasil sunting booking orders`,
                return : result
            }
        }).catch((err)=>{
            return (`Maaf, ada kesalahan masukan` + err)
        })
    }

    async deleteBookingOrders(field : BookingOrders) : Promise <any> {
        return await this.bookingOrdersRepository.delete({
            boorId : field.boorId
        }).then((result)=> {
            return ({
                messeage : `Selamat anda berhasil hapus data`,
                return : result
            })
        }).catch((err)=> {
            return (`Maaf, ada kesalahan` + err)
        })
    }
}

    