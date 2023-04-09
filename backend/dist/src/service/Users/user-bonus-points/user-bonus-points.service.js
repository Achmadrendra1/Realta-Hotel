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
exports.UserBonusPointsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserBonusPoints_1 = require("../../../entities/UserBonusPoints");
const typeorm_2 = require("typeorm");
const DataEnum = require("../../../DataEnum");
let UserBonusPointsService = class UserBonusPointsService {
    constructor(userBonusPointsRepository) {
        this.userBonusPointsRepository = userBonusPointsRepository;
    }
    async create(items) {
        const hasil = await this.userBonusPointsRepository.save({
            ubpoId: items.ubpoId,
            ubpoUser: items.ubpoUser,
            ubpoTotalPoints: items.ubpoTotalPoints,
            ubpoBonusType: DataEnum.BonusType[items.ubpoBonusType],
            ubpoCreatedOn: new Date(),
        });
        return {
            message: 'Data Berhasil dibuat',
            result: hasil,
        };
    }
    async findAll() {
        return await this.userBonusPointsRepository.find();
    }
    async update(id, items) {
        return await this.userBonusPointsRepository
            .update({ ubpoId: id }, {
            ubpoUser: items.ubpoUser,
            ubpoTotalPoints: items.ubpoTotalPoints,
            ubpoBonusType: DataEnum.BonusType[items.ubpoBonusType],
            ubpoCreatedOn: new Date(),
        })
            .catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async remove(id) {
        const result = await this.userBonusPointsRepository.delete({ ubpoId: id });
        if (result.affected > 0) {
            throw new common_1.HttpException({
                message: 'Data User Bonus Point Berhasil Dihapus',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                message: 'Data User Bonus Point Tidak Ditemukan',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
UserBonusPointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserBonusPoints_1.UserBonusPoints)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserBonusPointsService);
exports.UserBonusPointsService = UserBonusPointsService;
//# sourceMappingURL=user-bonus-points.service.js.map