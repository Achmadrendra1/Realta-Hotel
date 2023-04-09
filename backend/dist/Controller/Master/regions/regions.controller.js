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
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const regions_service_1 = require("../../../Service/Master/regions/regions.service");
const Regions_1 = require("../../../entities/Regions");
let RegionsController = class RegionsController {
    constructor(RegionsService) {
        this.RegionsService = RegionsService;
    }
    getLocation() {
        return this.RegionsService.getLocation();
    }
    getLocationRC() {
        return this.RegionsService.getLocationRC();
    }
    getLocationRCP() {
        return this.RegionsService.getLocationRCP();
    }
    async createCountry(data) {
        await this.RegionsService.createRC(data);
    }
    async createProvinces(data) {
        await this.RegionsService.createRCP(data);
    }
    async createAddress(data) {
        await this.RegionsService.createRCPA(data);
    }
    findall() {
        return this.RegionsService.findAllRegions();
    }
    findById(id) {
        return this.RegionsService.findOneRegions(id);
    }
    async createRegions(data) {
        const regions = await this.RegionsService.createRegions(data);
        console.log('data ctrl', data);
        if (!regions) {
            return 'failed insert to regions';
        }
        else {
            return ' success insert to regions';
        }
    }
    async update(params, body) {
        return this.RegionsService.updateRegions(params.id, body);
    }
    remove(params) {
        const result = this.RegionsService.deleteRegions(params.id);
        if (result) {
            return `data hasbeen deleted `;
        }
        else {
            return ' gagal';
        }
    }
};
__decorate([
    (0, common_1.Get)('locations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegionsController.prototype, "getLocation", null);
__decorate([
    (0, common_1.Get)('locationsRC'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegionsController.prototype, "getLocationRC", null);
__decorate([
    (0, common_1.Get)('locationsRCP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegionsController.prototype, "getLocationRCP", null);
__decorate([
    (0, common_1.Post)('insertRC'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createCountry", null);
__decorate([
    (0, common_1.Post)('insertRCP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createProvinces", null);
__decorate([
    (0, common_1.Post)('insertRCPA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Regions_1.Regions]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createRegions", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RegionsController.prototype, "remove", null);
RegionsController = __decorate([
    (0, common_1.Controller)('regions'),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
exports.RegionsController = RegionsController;
//# sourceMappingURL=regions.controller.js.map