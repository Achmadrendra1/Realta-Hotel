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
exports.SpecialOffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const SpecialOffers_1 = require("../../../entities/SpecialOffers");
const typeorm_2 = require("typeorm");
const Enum = require("../../../DataEnum");
let SpecialOffersService = class SpecialOffersService {
    constructor(SpecialOffersRepository) {
        this.SpecialOffersRepository = SpecialOffersRepository;
    }
    async findAll() {
        return await this.SpecialOffersRepository.query('select * from booking.getspecialoffers');
    }
    async findAllId(id) {
        return await this.SpecialOffersRepository.find({
            where: {
                spofId: id,
            },
        });
    }
    async createSpecialOffers(field) {
        return await this.SpecialOffersRepository.save({
            spofName: field.spofName,
            spofDescription: field.spofDescription,
            spofType: Enum.UserType[field.spofType],
            spofDiscount: field.spofDiscount,
            spofStartDate: field.spofStartDate,
            spofEndDate: field.spofEndDate,
            spofMinQty: field.spofMinQty,
            spofMaxQty: field.spofMaxQty,
            spofModifiedDate: new Date(),
        })
            .then((result) => {
            return {
                messeage: `Selamat, Anda berhasil menambahkan Coupon Special Offers`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async updateSpecialOffers(id, field) {
        return await this.SpecialOffersRepository.update({
            spofId: id,
        }, {
            spofName: field.spofName,
            spofDescription: field.spofDescription,
            spofType: Enum.UserType[field.spofType],
            spofDiscount: field.spofDiscount,
            spofStartDate: field.spofStartDate,
            spofEndDate: field.spofEndDate,
            spofMinQty: field.spofMinQty,
            spofMaxQty: field.spofMaxQty,
            spofModifiedDate: new Date(),
        })
            .then((result) => {
            return {
                messeage: `Selamat anda berhasil sunting Coupon Special Offers`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async deleteSpecialOffers(id) {
        return await this.SpecialOffersRepository.delete({
            spofId: id,
        }).then((result) => {
            return {
                messeage: `Selamat anda berhasil hapus data`,
                return: result,
            };
        });
    }
};
SpecialOffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(SpecialOffers_1.SpecialOffers)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SpecialOffersService);
exports.SpecialOffersService = SpecialOffersService;
//# sourceMappingURL=special-offers.service.js.map