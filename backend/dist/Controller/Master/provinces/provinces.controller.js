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
exports.ProvincesController = void 0;
const common_1 = require("@nestjs/common");
const provinces_service_1 = require("../../../Service/Master/provinces/provinces.service");
const Proviences_1 = require("../../../entities/Proviences");
let ProvincesController = class ProvincesController {
    constructor(ProvincesService) {
        this.ProvincesService = ProvincesService;
    }
    findall() {
        return this.ProvincesService.findAllProviences();
    }
    findById(id) {
        return this.ProvincesService.findOneProviences(id);
    }
    async createProviences(data) {
        const regions = await this.ProvincesService.createProviences(data);
        if (!regions) {
            return 'failed insert to regions';
        }
        else {
            return ' success insert to regions';
        }
    }
    update(params, body) {
        return this.ProvincesService.updateProviences(params.id, body);
    }
    remove(params) {
        const result = this.ProvincesService.deleteProviences(params.id);
        if (result) {
            return `data hasbeen deleted`;
        }
        else {
            return `gagal`;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Proviences_1.Proviences]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "createProviences", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "remove", null);
ProvincesController = __decorate([
    (0, common_1.Controller)('provinces'),
    __metadata("design:paramtypes", [provinces_service_1.ProvincesService])
], ProvincesController);
exports.ProvincesController = ProvincesController;
//# sourceMappingURL=provinces.controller.js.map