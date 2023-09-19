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
exports.UserPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const UserPassword_1 = require("../../../entities/UserPassword");
const typeorm_2 = require("typeorm");
let UserPasswordService = class UserPasswordService {
    constructor(UserPasswordRepository) {
        this.UserPasswordRepository = UserPasswordRepository;
    }
    async findById(id) {
        const result = await this.UserPasswordRepository.findOneBy({ uspaUserId: id });
        return result;
    }
    async ChangePassword(id, item) {
        try {
            const newPasswordHash = await bcrypt.hash(item.uspa_passwordhash, 10);
            const salt = await bcrypt.genSalt(10);
            await this.UserPasswordRepository.createQueryBuilder()
                .update()
                .set({
                uspaPasswordhash: newPasswordHash,
                uspaPasswordsalt: salt
            })
                .where('uspaUserId = :id', { id })
                .execute();
            return 'Message : Password berhasil di Ubah!';
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message,
            }, common_1.HttpStatus.OK);
        }
    }
};
UserPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserPassword_1.UserPassword)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserPasswordService);
exports.UserPasswordService = UserPasswordService;
//# sourceMappingURL=userPassword.service.js.map