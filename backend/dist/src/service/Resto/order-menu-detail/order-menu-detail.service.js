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
exports.OrderMenuDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const OrderMenuDetail_1 = require("../../../entities/OrderMenuDetail");
const typeorm_2 = require("typeorm");
let OrderMenuDetailService = class OrderMenuDetailService {
    constructor(orderMenuDetailRepository) {
        this.orderMenuDetailRepository = orderMenuDetailRepository;
    }
    async getAll() {
        return await this.orderMenuDetailRepository.find();
    }
    async addOrderMenuDetail(data) {
        return await this.orderMenuDetailRepository.insert({
            ormePrice: data.ormePrice,
            ormeQty: data.ormeQty,
            ormeSubtotal: data.ormeSubtotal,
            ormeDiscount: data.ormeDiscount,
            omdeOrme: data.omdeOrme,
            omdeReme: data.omdeReme
        });
    }
};
OrderMenuDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(OrderMenuDetail_1.OrderMenuDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderMenuDetailService);
exports.OrderMenuDetailService = OrderMenuDetailService;
//# sourceMappingURL=order-menu-detail.service.js.map