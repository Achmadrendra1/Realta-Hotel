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
exports.UserAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserAccounts_1 = require("../../../entities/UserAccounts");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserAccountService = class UserAccountService {
    constructor(uacRepository) {
        this.uacRepository = uacRepository;
    }
    async getAll() {
        return await this.uacRepository.find();
    }
    async getAccount(id) {
        return await this.uacRepository.find({
            where: { usacUserId: id },
        });
    }
    async getDataWithJoin() {
        return this.uacRepository.find({
            relations: {
                usacUser: true,
            },
            select: {
                usacAccountNumber: true,
                usacUser: {
                    userId: true,
                    userFullName: true,
                },
            },
        });
    }
    async getByAccNumber(accNumber) {
        return await this.uacRepository.findOneBy({
            usacAccountNumber: accNumber,
        });
    }
    async createAccount(items) {
        try {
            const salt = await bcrypt.genSalt(10);
            const code = await bcrypt.hash(items.usacSecureCode, salt);
            await this.uacRepository.save({
                usacEntityId: items.usacEntityId,
                usacUserId: items.usacUserId,
                usacAccountNumber: items.usacAccountNumber,
                usacSaldo: items.usacSaldo,
                usacType: items.usacType,
                usacExpmonth: items.usacExpmonth,
                usacExpyear: items.usacExpyear,
                usacSecureCode: code,
                usacModifiedDate: new Date(),
            });
            const result = await this.getAll();
            return {
                message: 'Data Payment Gateway Berhasil Dibuat',
                result: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: `Card Number Or Bank Is Already Exist` }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAccount(accNumber, items) {
        await this.uacRepository
            .update({
            usacAccountNumber: accNumber,
        }, {
            usacEntityId: items.usacEntityId,
            usacUserId: items.usacUserId,
            usacAccountNumber: items.usacAccountNumber,
            usacSaldo: items.usacSaldo,
            usacType: items.usacType,
            usacExpmonth: items.usacExpmonth,
            usacExpyear: items.usacExpyear,
            usacModifiedDate: new Date(),
        })
            .catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
        const updated = await this.getByAccNumber(accNumber);
        return {
            message: 'Data User Account Berhasil di Update',
            result: updated,
        };
    }
    async deleteAccount(accNumber) {
        await this.uacRepository.delete({
            usacAccountNumber: accNumber,
        });
        return 'User Account Deleted';
    }
    async updateSecureCode(items) {
        const salt = await bcrypt.genSalt();
        const newCode = await bcrypt.hash(items.secureCode, salt);
        return await this.uacRepository.update({
            usacAccountNumber: items.sourceNumber,
        }, {
            usacSecureCode: newCode,
        }).then(() => {
            return { message: 'Your PIN is Updated !' };
        }).catch((err) => {
            return { error: err };
        });
    }
    async checkSecureCode(items) {
        const acc = await this.getByAccNumber(items.sourceNumber);
        const check = await bcrypt.compare(items.secureCode, acc.usacSecureCode);
        if (check == true) {
            return {
                status: check,
                message: 'Your PIN is correct! Please Wait',
            };
        }
        else {
            throw new common_1.HttpException({
                status: check,
                message: 'Oops, Your PIN is incorrect! Please check and try again!',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
UserAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserAccounts_1.UserAccounts)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserAccountService);
exports.UserAccountService = UserAccountService;
//# sourceMappingURL=user-account.service.js.map