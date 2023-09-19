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
exports.BookingOrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const BookingOrderDetail_1 = require("../../../entities/BookingOrderDetail");
let BookingOrderDetailService = class BookingOrderDetailService {
    constructor(bookingOrderDetail) {
        this.bookingOrderDetail = bookingOrderDetail;
    }
    async findAll() {
        return await this.bookingOrderDetail.find();
    }
    async findAllId(id) {
        return await this.bookingOrderDetail.find({
            where: {
                bordeId: id,
            },
        });
    }
    async findLastBookingDetail() {
        return await this.bookingOrderDetail.query('SELECT * FROM booking.booking_order_detail ORDER BY borde_id DESC LIMIT 1');
    }
    async createBookingOrderDetail(field) {
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
    async updateBookingOrderDetail(id, field) {
        return await this.bookingOrderDetail
            .update({
            bordeId: id,
        }, {
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
                messeage: `Selamat anda berhasil sunting booking order detail`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async deleteBookingOrderDetail(id) {
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
};
BookingOrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookingOrderDetail_1.BookingOrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingOrderDetailService);
exports.BookingOrderDetailService = BookingOrderDetailService;
//# sourceMappingURL=booking_order_detail.service.js.map