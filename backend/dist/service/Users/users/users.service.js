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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserProfiles_1 = require("../../../entities/UserProfiles");
const UserRoles_1 = require("../../../entities/UserRoles");
const Users_1 = require("../../../entities/Users");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(UsersRepository, UserProfilesRepository, UserRolesRepository) {
        this.UsersRepository = UsersRepository;
        this.UserProfilesRepository = UserProfilesRepository;
        this.UserRolesRepository = UserRolesRepository;
    }
    async findAll() {
        return await this.UsersRepository.find();
    }
    async findByEmail(userEmail) {
        return await this.UsersRepository.query(`select * from users.getUserDetail($1)`, [userEmail]);
    }
    async register(user) {
        try {
            return await this.UsersRepository.query('CALL users.Register($1, $2, $3, $4)', [
                user.userFullName,
                user.userEmail,
                user.userPhoneNumber,
                user.UserPassword,
            ]);
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async Delete(id) {
        const result = await this.UsersRepository.delete({ userId: id });
        if (result.affected > 0) {
            throw new common_1.HttpException({
                message: 'Data User Account Berhasil Dihapus',
            }, common_1.HttpStatus.OK);
        }
        else {
            throw new common_1.HttpException({
                message: 'Data User Account Tidak Ditemukan',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateProfile(id, data) {
        try {
            const result = await this.UsersRepository.createQueryBuilder()
                .update()
                .set({
                userFullName: data.user_full_name,
                userType: data.user_type,
                userCompanyName: data.user_company_name,
                userEmail: data.user_email,
                userPhoneNumber: data.user_phone_number,
                userModifiedDate: new Date(),
            })
                .where('userId = :id', { id })
                .execute();
            await this.UserProfilesRepository.createQueryBuilder()
                .update()
                .set({
                usproNationalId: data.uspro_national_id,
                usproBirtDate: data.uspro_birt_date,
                usproJobTitle: data.uspro_job_title,
                usproMartialStatus: data.uspro_marital_status,
                usproGender: data.uspro_gender,
            })
                .where('usproUser = :id', { id })
                .execute();
            await this.UserRolesRepository.createQueryBuilder()
                .update()
                .set({
                usroRole: data.usro_role,
            })
                .where('usroUserId=:id', { id })
                .execute();
            return `Message : Data berhasil di Ubah! 
    Hasil : ${result}`;
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message,
            }, common_1.HttpStatus.OK);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(UserProfiles_1.UserProfiles)),
    __param(2, (0, typeorm_1.InjectRepository)(UserRoles_1.UserRoles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map