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
exports.PriceItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PriceItems_1 = require("../../../entities/PriceItems");
let PriceItemsService = class PriceItemsService {
    constructor(priceItemsRepository) {
        this.priceItemsRepository = priceItemsRepository;
    }
    async findAllPriceItems() {
        return await this.priceItemsRepository.find({
            order: {
                pritId: 'ASC',
            },
        });
    }
    async findOnePriceItems(pritId) {
        return await this.priceItemsRepository.findOne({
            where: {
                pritId: pritId,
            },
        });
    }
    async getPriceByName(name) {
        return await this.priceItemsRepository.find({
            where: {
                pritName: (0, typeorm_2.Like)(`%${name}%`),
            },
        });
    }
    async getPriceItemByHotelName(name) {
        return await this.priceItemsRepository
            .createQueryBuilder('priceItems')
            .leftJoinAndSelect('priceItems.bookingOrderDetailExtras', 'bookingOrderDetailExtras')
            .leftJoinAndSelect('bookingOrderDetailExtras.boexBorde', 'bookingOrderDetail')
            .leftJoinAndSelect('bookingOrderDetail.borderBoor', 'bookingOrders')
            .leftJoinAndSelect('bookingOrders.boorHotel', 'hotels')
            .where('priceItems.name = :name', { name })
            .select('hotels.hotelName')
            .getOne();
    }
    async createPriceItems(data) {
        return await this.priceItemsRepository.save(this.priceItemsRepository.create(data));
    }
    async updatePriceItems(pritId, data) {
        return await this.priceItemsRepository
            .update({ pritId: pritId }, data)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deletePriceItems(pritId) {
        return await this.priceItemsRepository
            .delete({ pritId: pritId })
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
};
PriceItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PriceItems_1.PriceItems)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PriceItemsService);
exports.PriceItemsService = PriceItemsService;
//# sourceMappingURL=price_items.service.js.map