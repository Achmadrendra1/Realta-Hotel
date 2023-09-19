"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingOrdersService = void 0;
const common_1 = require("@nestjs/common");
const BookingOrders_1 = require("../../../entities/BookingOrders");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const Enum = require("../../../DataEnum");
let BookingOrdersService = class BookingOrdersService {
    constructor(bookingOrdersRepository) {
        this.bookingOrdersRepository = bookingOrdersRepository;
    }
    async findLastBooking() {
        return await this.bookingOrdersRepository.query('SELECT * FROM booking.booking_orders ORDER BY boor_id DESC LIMIT 1');
    }
    async findAll() {
        return await this.bookingOrdersRepository.find();
    }
    async findById(id) {
        return await this.bookingOrdersRepository.find({
            where: {
                boorId: id,
            },
        });
    }
    async createBookingOrdersFinal(data) {
        return await this.bookingOrdersRepository
            .query(`CALL booking.insertbooking (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
            )`, [
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
        ])
            .then((result) => {
            return {
                messeage: `Selamat anda berhasil menambahkan Booking Orders`,
                return: result,
            };
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async createBookingOrders(field) {
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
    async updateBookingOrders(id, field) {
        return await this.bookingOrdersRepository
            .update({
            boorId: id,
        }, {
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
                messeage: `Selamat anda berhasil sunting booking orders`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async deleteBookingOrders(id) {
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
    async findSpHotel() {
        return await this.bookingOrdersRepository.query('select * from hotel.viewHotel');
    }
    async findSpFacility() {
        return await this.bookingOrdersRepository.query('Select * from hotel.viewRoom');
    }
    async findSpReview() {
        return await this.bookingOrdersRepository.query('Select * From hotel.userreview');
    }
    async getInvoice() {
        return await this.bookingOrdersRepository.query('select * from booking.getbookinginvoice');
    }
};
BookingOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(BookingOrders_1.BookingOrders)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BookingOrdersService);
exports.BookingOrdersService = BookingOrdersService;
//# sourceMappingURL=booking_orders.service.js.map