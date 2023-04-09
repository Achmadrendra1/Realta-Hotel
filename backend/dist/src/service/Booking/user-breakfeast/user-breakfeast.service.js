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
exports.UserBreakfeastService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserBreakfeast_1 = require("../../../entities/UserBreakfeast");
const typeorm_2 = require("typeorm");
let UserBreakfeastService = class UserBreakfeastService {
    constructor(userBreakfeastRepository) {
        this.userBreakfeastRepository = userBreakfeastRepository;
    }
    async findAll() {
        return await this.userBreakfeastRepository.find();
    }
    async findAllId(id) {
        return await this.userBreakfeastRepository.find({
            where: {
                usbrBordeId: id,
            },
        });
    }
    async createUserBreakfeast(field) {
        return await this.userBreakfeastRepository
            .save({
            usbrBordeId: field.usbrBordeId,
            usbrModifiedDate: field.usbrModifiedDate,
            usbrTotalVacant: field.usbrTotalVacant,
        })
            .then((result) => {
            return {
                messeage: `Selamat anda berhasil menambahkan User Breakfeast`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async updateUserBreakfeast(id, field) {
        return await this.userBreakfeastRepository
            .update({
            usbrBordeId: id,
        }, {
            usbrBordeId: field.usbrBordeId,
            usbrModifiedDate: field.usbrModifiedDate,
            usbrTotalVacant: field.usbrTotalVacant,
        })
            .then((result) => {
            return {
                messeage: `Selamat anda berhasil masukan UserBreakfeast`,
                return: result,
            };
        })
            .catch((err) => {
            return `Maaf, ada kesalahan masukan` + err;
        });
    }
    async deleteUserBreakfeast(id) {
        return await this.userBreakfeastRepository
            .delete({
            usbrBordeId: id,
        })
            .then((result) => {
            return {
                messeage: `Selamat anda berhasil hapus data`,
                return: result,
            };
        });
    }
};
UserBreakfeastService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserBreakfeast_1.UserBreakfeast)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserBreakfeastService);
exports.UserBreakfeastService = UserBreakfeastService;
//# sourceMappingURL=user-breakfeast.service.js.map