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
exports.UserProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserProfiles_1 = require("../../../entities/UserProfiles");
const typeorm_2 = require("typeorm");
const DataEnum = require("../../../DataEnum");
let UserProfilesService = class UserProfilesService {
    constructor(userProfilesRepository) {
        this.userProfilesRepository = userProfilesRepository;
    }
    async create(item) {
        const hasil = await this.userProfilesRepository.save({
            usproId: item.usproId,
            usproNationalId: item.usproNationalId,
            usproBirtDate: item.usproBirtDate,
            usproJobTitle: item.usproJobTitle,
            usproMartialStatus: DataEnum.MaritalStatus[item.usproMartialStatus],
            usproGender: DataEnum.Gender[item.usproGender],
            usproAddr: item.usproAddr,
            usproUser: item.usproUser,
        });
        return {
            message: 'Data Berhasil dibuat',
            result: hasil,
        };
    }
    async findAll() {
        return await this.userProfilesRepository.find();
    }
    async update(id, item) {
        return await this.userProfilesRepository.update({ usproId: id }, {
            usproNationalId: item.usproNationalId,
            usproBirtDate: item.usproBirtDate,
            usproJobTitle: item.usproJobTitle,
            usproMartialStatus: DataEnum.MaritalStatus[item.usproMartialStatus],
            usproGender: DataEnum.Gender[item.usproGender],
            usproAddr: item.usproAddr,
            usproUser: item.usproUser,
        });
    }
    async remove(id) {
        return await this.userProfilesRepository.delete({ usproId: id });
    }
};
UserProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserProfiles_1.UserProfiles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserProfilesService);
exports.UserProfilesService = UserProfilesService;
//# sourceMappingURL=user-profiles.service.js.map