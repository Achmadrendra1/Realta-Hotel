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
exports.BankService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Bank_1 = require("../../../entities/Bank");
const typeorm_2 = require("typeorm");
const entitys_service_1 = require("../entitys/entitys.service");
let BankService = class BankService {
    constructor(bankRepository, entityService) {
        this.bankRepository = bankRepository;
        this.entityService = entityService;
    }
    async getAll() {
        return await this.bankRepository.find({
            order: {
                bankEntityId: 'ASC',
            },
        });
    }
    async getPagination(query) {
        const take = (query === null || query === void 0 ? void 0 : query.take) || 10;
        const page = (query === null || query === void 0 ? void 0 : query.page) || 1;
        const skip = (page - 1) * take;
        const keyword = (query === null || query === void 0 ? void 0 : query.keyword) || '';
        const [data, total] = await this.bankRepository
            .createQueryBuilder('bank')
            .where('LOWER(bank.bankName) LIKE LOWER(:keyword)', {
            keyword: `%${keyword.toLowerCase()}%`,
        })
            .orderBy('bank.bankEntityId', 'ASC')
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
        return await this.bankRepository.find({
            where: {
                bankEntityId: id,
            },
        });
    }
    async getByCode(bankCode) {
        return await this.bankRepository.findOneBy({
            bankCode: bankCode,
        });
    }
    async getByName(bankName) {
        return await this.bankRepository.findOneBy({
            bankName: bankName,
        });
    }
    async createBank(items) {
        try {
            await this.bankRepository.query('call payment.InsertBank($1, $2)', [
                items.bankCode,
                items.bankName,
            ]);
            const res = await this.getPagination();
            return {
                message: 'Data Bank Successfully Created',
                result: res
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Bank Code Or Bank Name Already Exist' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateBank(id, items) {
        const res = await this.getbyId(id);
        const all = await this.getAll();
        if (res[0]) {
            try {
                await this.bankRepository.update({
                    bankEntityId: id,
                }, {
                    bankEntityId: items.bankEntityId,
                    bankCode: items.bankCode,
                    bankName: items.bankName,
                    bankModifiedDate: new Date(),
                });
                return {
                    message: 'Data Bank Successfully Updated',
                };
            }
            catch (error) {
                throw new common_1.HttpException({
                    message: 'Bank Code Or Bank Name Already Exist',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException({
                message: 'Data Bank Does Not Exist',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteBank(id) {
        await this.bankRepository.delete({ bankEntityId: id }),
            await this.entityService.deleteEntity(id);
        return 'Data Bank Deleted';
    }
};
BankService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Bank_1.Bank)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        entitys_service_1.EntitysService])
], BankService);
exports.BankService = BankService;
//# sourceMappingURL=bank.service.js.map