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
exports.BookingOrderDetailExtraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const BookingOrderDetailExtra_1 = require("../../../entities/BookingOrderDetailExtra");
const typeorm_2 = require("typeorm");
let BookingOrderDetailExtraService = class BookingOrderDetailExtraService {
    constructor(bookingOrderDetailExtra) {
        this.bookingOrderDetailExtra = bookingOrderDetailExtra;
    }
    async findAll() {
        return await this.bookingOrderDetailExtra.find();
    }
    async findAllId(id) {
        return await this.bookingOrderDetailExtra.find({
            where: {
                boexId: id,
            },
        });
    }
    async createExtraMultiple(body) {
        body.map(async (body) => {
            const extraDetail = new BookingOrderDetailExtra_1.BookingOrderDetailExtra();
            extraDetail.boexPrit = body.pritId;
            extraDetail.boexPrice = body.boexPrice;
            extraDetail.boexQty = body.boexQty;
            extraDetail.boexSubtotal = body.boexSubtotal;
            extraDetail.boexMeasureUnit = body.boexMeasure;
            extraDetail.boexBorde = body.bordeId;
            return await this.bookingOrderDetailExtra.save(extraDetail);
        });
    }
    async createBookingOrderDetailExtra(field) {
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
    async updateBookingOrderDetailExtra(id, field) {
        return await this.bookingOrderDetailExtra
            .update({
            boexId: id,
        }, {
            boexPrice: field.boexPrice,
            boexQty: field.boexQty,
            boexSubtotal: field.boexSubtotal,
            boexMeasureUnit: field.boexMeasureUnit,
            boexBorde: field.boexBorde,
            boexPrit: field.boexPrit,
        })
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
    async deleteBookingOrderDetailExtra(id) {
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
};
BookingOrderDetailExtraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BookingOrderDetailExtra_1.BookingOrderDetailExtra)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingOrderDetailExtraService);
exports.BookingOrderDetailExtraService = BookingOrderDetailExtraService;
//# sourceMappingURL=booking-order-detail-extra.service.js.map