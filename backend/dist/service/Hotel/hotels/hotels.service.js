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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Hotels_1 = require("../../../entities/Hotels");
const typeorm_2 = require("typeorm");
let HotelsService = class HotelsService {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    async findAllHotels(query) {
        const take = (query === null || query === void 0 ? void 0 : query.take) || 10;
        const page = (query === null || query === void 0 ? void 0 : query.page) || 1;
        const skip = (page - 1) * take;
        const keyword = (query === null || query === void 0 ? void 0 : query.keyword) || '';
        const [data, total] = await this.hotelRepository.findAndCount({
            order: {
                hotelId: 'ASC',
            },
            relations: {
                facilities: {
                    facilityPhotos: true,
                    facilityPriceHistories: true,
                    faciCagro: true,
                },
                hotelReviews: true,
                hotelAddr: true,
            },
            where: { hotelName: (0, typeorm_2.ILike)(`%${keyword}%`) },
            skip,
            take,
        });
        return {
            data,
            page,
            count: total,
            currentPage: +page,
        };
    }
    async findByNameId(hotelId) {
        return await this.hotelRepository.find({
            where: { hotelId },
            relations: {
                facilities: {
                    facilityPhotos: true,
                    facilityPriceHistories: true,
                    faciCagro: true,
                },
                hotelReviews: true,
                hotelAddr: true,
            },
        });
    }
    async findByHotelName(hotelName) {
        return await this.hotelRepository.find({
            where: [{ hotelName }],
            relations: {
                facilities: {
                    facilityPhotos: true,
                    facilityPriceHistories: true,
                    faciCagro: true,
                },
                hotelReviews: true,
                hotelAddr: true,
            },
        });
    }
    async addNewHotel(hotel) {
        const date = new Date();
        return await this.hotelRepository
            .save({
            hotelName: hotel.hotelName,
            hotelDescription: hotel.hotelDescription,
            hotelRatingStar: hotel.hotelRatingStar,
            hotelPhonenumber: hotel.hotelPhonenumber,
            hotelModifiedDate: date,
            hotelAddr: hotel.hotelAddr,
        })
            .then((result) => {
            return {
                message: `Hotel successfuly added to the system`,
                result: result,
            };
        })
            .catch((error) => {
            return `Hotel failed adding to the system` + error;
        });
    }
    async UpdateHotel(hotelId, hotel) {
        const date = new Date();
        return await this.hotelRepository
            .update(hotelId, {
            hotelName: hotel.hotelName,
            hotelDescription: hotel.hotelDescription,
            hotelRatingStar: hotel.hotelRatingStar,
            hotelPhonenumber: hotel.hotelPhonenumber,
            hotelModifiedDate: date,
            hotelAddr: hotel.hotelAddr,
        })
            .then((result) => {
            return this.hotelRepository.findOne({
                where: { hotelId: hotelId },
                relations: {
                    facilities: {
                        facilityPhotos: true,
                        facilityPriceHistories: true,
                        faciCagro: true,
                    },
                    hotelReviews: true,
                    hotelAddr: true,
                },
            });
        })
            .catch((err) => {
            return `Failed to Update Hotel` + err;
        });
    }
    async deleteHotels(id) {
        console.log(id);
        await this.hotelRepository
            .delete(id)
            .then((result) => {
            return {
                message: `Hotels successfully deleted`,
                result: result,
            };
        })
            .catch((error) => {
            return `Failed to Delete` + error;
        });
    }
};
HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Hotels_1.Hotels)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelsService);
exports.HotelsService = HotelsService;
//# sourceMappingURL=hotels.service.js.map