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
exports.FacilityPriceHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const FacilityPriceHistory_1 = require("../../../entities/FacilityPriceHistory");
const typeorm_2 = require("typeorm");
let FacilityPriceHistoryService = class FacilityPriceHistoryService {
    constructor(faphRepository) {
        this.faphRepository = faphRepository;
    }
    async findAllFaph() {
        return await this.faphRepository.find({
            relations: {
                faphFaci: true,
                faphUser: true,
            },
        });
    }
    async findByFaphId(faph) {
        return await this.faphRepository.findOneBy({
            faphId: faph.faphId,
        });
    }
    async addNewFaph(faph) {
        return await this.faphRepository
            .save({
            faphFaci: faph.faphFaci,
            faphStartdate: faph.faphStartdate,
            faphEnddate: faph.faphEnddate,
            faphLowPrice: faph.faphLowPrice,
            faphHighPrice: faph.faphHighPrice,
            faphRatePrice: faph.faphRatePrice,
            faphDiscount: faph.faphDiscount,
            faphTaxRate: faph.faphTaxRate,
            faphModifiedDate: faph.faphModifiedDate,
            faphUser: faph.faphUser,
        })
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
    async UpdateFaph(id, faph) {
        return await this.faphRepository
            .update({
            faphId: id,
        }, {
            faphFaci: faph.faphFaci,
            faphStartdate: faph.faphStartdate,
            faphEnddate: faph.faphEnddate,
            faphLowPrice: faph.faphLowPrice,
            faphHighPrice: faph.faphHighPrice,
            faphRatePrice: faph.faphRatePrice,
            faphDiscount: faph.faphDiscount,
            faphTaxRate: faph.faphTaxRate,
            faphModifiedDate: faph.faphModifiedDate,
            faphUser: faph.faphUser,
        })
            .then((result) => {
            return {
                message: `Facilities successfully updated`,
                result: result,
            };
        })
            .catch((err) => {
            return `Failed to Update Facilities`;
        });
    }
    async deleteFaph(id) {
        await this.faphRepository
            .delete({
            faphId: id.faphId,
        })
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
FacilityPriceHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(FacilityPriceHistory_1.FacilityPriceHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacilityPriceHistoryService);
exports.FacilityPriceHistoryService = FacilityPriceHistoryService;
//# sourceMappingURL=facility_price_history.service.js.map