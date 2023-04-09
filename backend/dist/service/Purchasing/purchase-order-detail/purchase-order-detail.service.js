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
exports.PodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PurchaseOrderDetail_1 = require("../../../entities/PurchaseOrderDetail");
let PodeService = class PodeService {
    constructor(podeRepository) {
        this.podeRepository = podeRepository;
    }
    async findAllPode() {
        return await this.podeRepository.query('select * from purchasing.getALLPode()');
    }
    async findPodeId(id) {
        return await this.podeRepository.find({ where: { podeId: id } });
    }
    async addPode(pode) {
        await this.podeRepository.save({
            podePohe: pode.podePohe,
            podeOrderQty: pode.podeOrderQty,
            podePrice: pode.podePrice,
            podeLineTotal: pode.podeLineTotal,
            podeReceivedQty: pode.podeReceivedQty,
            podeRejectedQty: pode.podeRejectedQty,
            podeStockedQty: pode.podeStockedQty,
            podeModifiedDate: new Date(),
            podeStock: pode.podeStock
        });
        const res = await this.findAllPode();
        return ({ message: `Congrats, you have new Purchase Order Detail`, result: res });
    }
    async editPode(id, pode) {
        try {
            await this.podeRepository.update({
                podeId: id
            }, {
                podePohe: pode.podePohe,
                podeOrderQty: pode.podeOrderQty,
                podePrice: pode.podePrice,
                podeLineTotal: pode.podeLineTotal,
                podeReceivedQty: pode.podeReceivedQty,
                podeRejectedQty: pode.podeRejectedQty,
                podeStockedQty: pode.podeStockedQty,
                podeModifiedDate: new Date(),
                podeStock: pode.podeStock
            });
            return { message: `Congrats, you're purchase order detail has been changed` };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async dropPode(id) {
        await this.podeRepository.delete({ podeId: id });
        return `Congrats, you're purchase order detail has been deleted`;
    }
};
PodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PurchaseOrderDetail_1.PurchaseOrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PodeService);
exports.PodeService = PodeService;
//# sourceMappingURL=purchase-order-detail.service.js.map