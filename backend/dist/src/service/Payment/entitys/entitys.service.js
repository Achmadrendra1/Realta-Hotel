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
exports.EntitysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Entitys_1 = require("../../../entities/Entitys");
const typeorm_2 = require("typeorm");
let EntitysService = class EntitysService {
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async getAll() {
        return await this.entityRepository.find();
    }
    async getOne() {
        return await this.entityRepository.find({
            order: { entityId: "DESC" },
            take: 1
        });
    }
    async createEntity() {
        return await this.entityRepository.save({});
    }
    async deleteEntity(id) {
        return await this.entityRepository.delete({
            entityId: id
        });
    }
};
EntitysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Entitys_1.Entitys)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EntitysService);
exports.EntitysService = EntitysService;
//# sourceMappingURL=entitys.service.js.map