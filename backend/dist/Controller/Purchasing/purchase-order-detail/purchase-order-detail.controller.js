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
exports.PodeController = void 0;
const common_1 = require("@nestjs/common");
const purchase_order_detail_service_1 = require("../../../Service/Purchasing/purchase-order-detail/purchase-order-detail.service");
let PodeController = class PodeController {
    constructor(podeService) {
        this.podeService = podeService;
    }
    getPode() {
        return this.podeService.findAllPode();
    }
    getPodeId(params) {
        return this.podeService.findPodeId(params.id);
    }
    createPode(body) {
        return this.podeService.addPode(body);
    }
    updatePode(params, body) {
        return this.podeService.editPode(params.id, body);
    }
    deletePode(params) {
        return this.podeService.dropPode(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PodeController.prototype, "getPode", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PodeController.prototype, "getPodeId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PodeController.prototype, "createPode", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PodeController.prototype, "updatePode", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PodeController.prototype, "deletePode", null);
PodeController = __decorate([
    (0, common_1.Controller)('purchase-order-detail'),
    __metadata("design:paramtypes", [purchase_order_detail_service_1.PodeService])
], PodeController);
exports.PodeController = PodeController;
//# sourceMappingURL=purchase-order-detail.controller.js.map