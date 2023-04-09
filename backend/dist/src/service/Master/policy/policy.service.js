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
exports.PolicyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Policy_1 = require("../../../entities/Policy");
let PolicyService = class PolicyService {
    constructor(policyRepository) {
        this.policyRepository = policyRepository;
    }
    async findAllPolicy() {
        return await this.policyRepository.find({
            order: {
                poliId: 'ASC',
            },
        });
    }
    async findOnePolicy(poliId) {
        return await this.policyRepository.findOne({
            where: {
                poliId: poliId,
            },
        });
    }
    async getPolicyByName(name) {
        return await this.policyRepository.find({
            where: {
                poliName: (0, typeorm_2.Like)(`%${name}%`),
            },
        });
    }
    async getPolicyByCategory(name) {
        return await this.policyRepository
            .createQueryBuilder('policy')
            .innerJoinAndSelect('policy.policyCategoryGroup', 'policyCategoryGroup')
            .innerJoinAndSelect('policyCategoryGroup.pocaCagro', 'categoryGroup')
            .where('categoryGroup.cagroName ILIKE :name', { name: `%${name}%` })
            .getMany();
    }
    async createPolicy(data) {
        return await this.policyRepository.save(data);
    }
    async updatePolicy(poliId, data) {
        return await this.policyRepository
            .update({ poliId: poliId }, data)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deletePolicy(poliId) {
        return await this.policyRepository
            .delete({ poliId: poliId })
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
};
PolicyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Policy_1.Policy)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PolicyService);
exports.PolicyService = PolicyService;
//# sourceMappingURL=policy.service.js.map