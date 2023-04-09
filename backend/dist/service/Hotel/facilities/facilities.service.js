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
exports.FacilitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Facilities_1 = require("../../../entities/Facilities");
const FacilityPriceHistory_1 = require("../../../entities/FacilityPriceHistory");
const typeorm_2 = require("typeorm");
const hotels_service_1 = require("../hotels/hotels.service");
let FacilitiesService = class FacilitiesService {
    constructor(faciRepository, faciHistoryRepository, HotelsService) {
        this.faciRepository = faciRepository;
        this.faciHistoryRepository = faciHistoryRepository;
        this.HotelsService = HotelsService;
    }
    async findAllFaci() {
        return await this.faciRepository.find({
            relations: {
                faciHotel: true,
                facilityPhotos: true,
                facilityPriceHistories: true,
                faciCagro: true,
            },
        });
    }
    async landing() {
        return await this.faciRepository.find({
            relations: {
                faciHotel: {
                    hotelAddr: true,
                },
                facilityPhotos: true,
                faciCagro: true,
            },
            where: { faciCagro: { cagroName: 'Room' } },
        });
    }
    async landingById(faciId) {
        return await this.faciRepository.find({
            relations: {
                faciHotel: true,
                facilityPhotos: true,
                facilityPriceHistories: true,
                faciCagro: true,
            },
            where: { faciId, faciCagro: { cagroName: (0, typeorm_2.In)(['Room', 'Restaurant ']) } },
        });
    }
    async findByFaciId(faciId) {
        return await this.faciRepository.find({
            where: { faciId },
            relations: {
                faciHotel: true,
                facilityPhotos: true,
                facilityPriceHistories: true,
                faciCagro: true,
            },
        });
    }
    async addNewFaci(faci) {
        const date = new Date();
        const result = await this.faciRepository.save({
            faciName: faci.faciName,
            faciDescription: faci.faciDescription,
            faciMaxNumber: faci.faciMaxNumber,
            faciMeasureUnit: faci.faciMeasureUnit,
            faciRoomNumber: faci.faciRoomNumber,
            faciStartdate: date,
            faciEnddate: faci.faciEnddate,
            faciLowPrice: faci.faciLowPrice,
            faciHighPrice: faci.faciHighPrice,
            faciRatePrice: faci.faciRatePrice,
            faciDiscount: faci.faciDiscount,
            faciTaxRate: faci.faciTaxRate,
            faciModifiedDate: date,
            faciHotel: faci.faciHotel,
            faciCagro: faci.faciCagro,
        });
        const id = result.faciId;
        await this.faciHistoryRepository.save({
            faphFaci: { faciId: id },
            faphStartdate: new Date(),
            faphEnddate: result.faciEnddate,
            faphLowPrice: result.faciLowPrice,
            faphHighPrice: result.faciHighPrice,
            faphRatePrice: result.faciRatePrice,
            faphDiscount: result.faciDiscount,
            faphTaxRate: result.faciTaxRate,
            faphModifiedDate: date,
            faphUser: faci.userId,
        });
        return await this.HotelsService.findByNameId(result.faciHotel.hotelId)
            .then((result) => {
            return {
                message: `Facilities successfuly added to the system`,
                result: result,
            };
        })
            .catch((error) => {
            return `facilities failed adding to the system` + error;
        });
    }
    async UpdateFaci(faciId, faci) {
        const date = new Date();
        await this.faciRepository.update(faciId, {
            faciName: faci.faciName,
            faciDescription: faci.faciDescription,
            faciMaxNumber: faci.faciMaxNumber,
            faciMeasureUnit: faci.faciMeasureUnit,
            faciRoomNumber: faci.faciRoomNumber,
            faciStartdate: faci.faciStartdate,
            faciEnddate: faci.faciEnddate,
            faciLowPrice: faci.faciLowPrice,
            faciHighPrice: faci.faciHighPrice,
            faciRatePrice: faci.faciRatePrice,
            faciDiscount: faci.faciDiscount,
            faciTaxRate: faci.faciTaxRate,
            faciModifiedDate: faci.faciModifiedDate,
            faciHotel: faci.faciHotel,
            faciCagro: faci.faciCagro,
        });
        return await this.faciHistoryRepository
            .save({
            faphFaci: { faciId: faciId },
            faphStartdate: date,
            faphEnddate: faci.faciEnddate,
            faphLowPrice: faci.faciLowPrice,
            faphHighPrice: faci.faciHighPrice,
            faphRatePrice: faci.faciRatePrice,
            faphDiscount: faci.faciDiscount,
            faphTaxRate: faci.faciTaxRate,
            faphModifiedDate: date,
            faphUser: faci.userId,
        })
            .then((result) => {
            return this.faciRepository.findOne({
                where: { faciId: faciId },
                relations: {
                    faciHotel: true,
                    facilityPhotos: true,
                    facilityPriceHistories: true,
                    faciCagro: true,
                },
            });
        })
            .catch((err) => {
            return `Failed to Update Facilities` + err;
        });
    }
    async deleteFaci(id) {
        await this.faciRepository
            .delete(id)
            .then((result) => {
            return {
                message: `Facilities successfully deleted`,
                result: result,
            };
        })
            .catch((error) => {
            return `Failed to Delete` + error;
        });
    }
};
FacilitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Facilities_1.Facilities)),
    __param(1, (0, typeorm_1.InjectRepository)(FacilityPriceHistory_1.FacilityPriceHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        hotels_service_1.HotelsService])
], FacilitiesService);
exports.FacilitiesService = FacilitiesService;
//# sourceMappingURL=facilities.service.js.map