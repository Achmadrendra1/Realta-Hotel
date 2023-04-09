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
exports.PolicyController = void 0;
const common_1 = require("@nestjs/common");
const Policy_1 = require("../../../entities/Policy");
const policy_service_1 = require("../../../Service/Master/policy/policy.service");
let PolicyController = class PolicyController {
    constructor(PolicyService) {
        this.PolicyService = PolicyService;
    }
    findall() {
        return this.PolicyService.findAllPolicy();
    }
    findById(id) {
        return this.PolicyService.findOnePolicy(id);
    }
    PolicyName(params) {
        return this.PolicyService.getPolicyByName(params);
    }
    async getPolicyByCategory(name) {
        return await this.PolicyService.getPolicyByCategory(name);
    }
    async createPolicy(data) {
        const policy = await this.PolicyService.createPolicy(data);
        if (!policy) {
            return 'failed insert to policy';
        }
        else {
            return ' success insert to policy';
        }
    }
    update(params, body) {
        return this.PolicyService.updatePolicy(params.id, body);
    }
    async remove(params) {
        const policy = await this.PolicyService.deletePolicy(params.id);
        if (policy) {
            return ' failed delete policy';
        }
        else {
            return ' success delete data policy';
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "PolicyName", null);
__decorate([
    (0, common_1.Get)('category/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "getPolicyByCategory", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Policy_1.Policy]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "remove", null);
PolicyController = __decorate([
    (0, common_1.Controller)('policy'),
    __metadata("design:paramtypes", [policy_service_1.PolicyService])
], PolicyController);
exports.PolicyController = PolicyController;
//# sourceMappingURL=policy.controller.js.map