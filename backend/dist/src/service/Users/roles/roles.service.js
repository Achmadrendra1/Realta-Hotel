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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Roles_1 = require("../../../entities/Roles");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    constructor(RolesRepository) {
        this.RolesRepository = RolesRepository;
    }
    async CreateRoles(item) {
        return await this.RolesRepository.save(item);
    }
    async findAll() {
        return await this.RolesRepository.find();
    }
    async findOne(id) {
        return await this.RolesRepository.findOneBy({ roleId: id });
    }
    async update(id, item) {
        const hasil = await this.RolesRepository.update({ roleId: id }, { roleName: item.roleName });
        return {
            Message: 'Berhasil Update',
            Hasil: hasil,
        };
    }
    async Delete(id) {
        const hasil = await this.RolesRepository.delete({ roleId: id });
        return {
            Message: 'Berhasil Delete',
            Hasil: hasil,
        };
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Roles_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map