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
exports.PaymentGatewayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const PaymentGateway_1 = require("../../../entities/PaymentGateway");
const typeorm_2 = require("typeorm");
const entitys_service_1 = require("../entitys/entitys.service");
let PaymentGatewayService = class PaymentGatewayService {
    constructor(payRepository, entityService) {
        this.payRepository = payRepository;
        this.entityService = entityService;
    }
    async getAll() {
        return await this.payRepository.find();
    }
    async getPagination(query) {
        const take = (query === null || query === void 0 ? void 0 : query.take) || 10;
        const page = (query === null || query === void 0 ? void 0 : query.page) || 1;
        const skip = (page - 1) * take;
        const keyword = (query === null || query === void 0 ? void 0 : query.keyword) || '';
        const [data, total] = await this.payRepository
            .createQueryBuilder('paymentGateway')
            .where('LOWER(paymentGateway.pagaName) LIKE LOWER(:keyword)', {
            keyword: `%${keyword.toLowerCase()}%`,
        })
            .skip(skip)
            .take(take)
            .getManyAndCount();
        return {
            data: data,
            count: total,
            currentPage: +page,
        };
    }
    async getbyId(id) {
        return await this.payRepository.find({
            where: {
                pagaEntityId: id,
            },
        });
    }
    async getByCode(pagaCode) {
        return await this.payRepository.findOneBy({
            pagaCode: pagaCode,
        });
    }
    async getByName(pagaName) {
        return await this.payRepository.findOneBy({
            pagaName: pagaName,
        });
    }
    async createPaga(items) {
        try {
            await this.payRepository.query('call payment.InsertPaga($1, $2)', [
                items.pagaCode,
                items.pagaName,
            ]);
            const res = await this.getAll();
            return {
                message: 'Data Fintech Successfully Created',
                result: res,
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Fintech Code Or Name Already Exist' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePaga(id, items) {
        try {
            await this.payRepository.update({
                pagaEntityId: id,
            }, {
                pagaEntityId: items.pagaEntityId,
                pagaCode: items.pagaCode,
                pagaName: items.pagaName,
                pagaModifiedDate: new Date(),
            });
            return {
                message: 'Data Fintech Berhasil di Update',
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePaga(id) {
        await this.payRepository.delete({
            pagaEntityId: id,
        });
        await this.entityService.deleteEntity(id);
        return 'Data Payment Gateway Berhasil Dihapus';
    }
};
PaymentGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PaymentGateway_1.PaymentGateway)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        entitys_service_1.EntitysService])
], PaymentGatewayService);
exports.PaymentGatewayService = PaymentGatewayService;
//# sourceMappingURL=payment-gateway.service.js.map