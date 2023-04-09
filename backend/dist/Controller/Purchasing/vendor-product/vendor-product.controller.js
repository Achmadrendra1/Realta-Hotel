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
exports.VeproController = void 0;
const common_1 = require("@nestjs/common");
const vendor_product_service_1 = require("../../../Service/Purchasing/vendor-product/vendor-product.service");
let VeproController = class VeproController {
    constructor(veproService) {
        this.veproService = veproService;
    }
    getVepro() {
        return this.veproService.findAllVepro();
    }
    getVeproId(params) {
        return this.veproService.findVeproId(params.id);
    }
    createVepro(body) {
        return this.veproService.addVepro(body);
    }
    updateStod(params, body) {
        return this.veproService.editVepro(params.id, body);
    }
    deleteVepro(params) {
        return this.veproService.dropVepro(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VeproController.prototype, "getVepro", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VeproController.prototype, "getVeproId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VeproController.prototype, "createVepro", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], VeproController.prototype, "updateStod", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VeproController.prototype, "deleteVepro", null);
VeproController = __decorate([
    (0, common_1.Controller)('vendor-product'),
    __metadata("design:paramtypes", [vendor_product_service_1.VeproService])
], VeproController);
exports.VeproController = VeproController;
//# sourceMappingURL=vendor-product.controller.js.map