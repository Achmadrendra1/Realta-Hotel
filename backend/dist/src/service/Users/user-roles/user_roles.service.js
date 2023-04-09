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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserRoles_1 = require("../../../entities/UserRoles");
const typeorm_2 = require("typeorm");
let UserRolesService = class UserRolesService {
    constructor(UserRolesRepository) {
        this.UserRolesRepository = UserRolesRepository;
    }
    async Create(items) {
        const hasil = await this.UserRolesRepository.save({
            usroUserId: items.usroUserId,
            usroRole: items.usroRole,
        });
        return {
            message: 'Data Berhasil dibuat',
            result: hasil,
        };
    }
    async findAll() {
        return await this.UserRolesRepository.find({
            select: {
                usroUserId: true,
            },
            relations: {
                usroUser: true,
                usroRole: true,
            },
        });
    }
    async update(id, items) {
        const hasil = await this.UserRolesRepository.update({ usroUserId: id }, {
            usroRole: items.usroRole,
        });
        return {
            Message: 'Berhasil Update',
            Hasil: hasil,
        };
    }
    async remove(id) {
        const result = await this.UserRolesRepository.delete({ usroUserId: id });
        if (result.affected > 0) {
            throw new common_1.HttpException({
                message: 'Data User Roles Berhasil Dihapus',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                message: 'Data User Roles Tidak Ditemukan',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
UserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserRoles_1.UserRoles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRolesService);
exports.UserRolesService = UserRolesService;
//# sourceMappingURL=user_roles.service.js.map