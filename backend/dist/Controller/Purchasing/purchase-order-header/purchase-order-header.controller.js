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
exports.PoheController = void 0;
const common_1 = require("@nestjs/common");
const purchase_order_header_service_1 = require("../../../Service/Purchasing/purchase-order-header/purchase-order-header.service");
let PoheController = class PoheController {
    constructor(poheService) {
        this.poheService = poheService;
    }
    getPohe() {
        return this.poheService.findAllPohe();
    }
    getPoheId(params) {
        return this.poheService.findPoheId(params.id);
    }
    getPoheNumber(params) {
        return this.poheService.findPoheNumber(params.number);
    }
    createPohe(body) {
        return this.poheService.addPohe(body);
    }
    updatePohe(params, body) {
        return this.poheService.editPohe(params.id, body);
    }
    deletePohe(params) {
        return this.poheService.dropPohe(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "getPohe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "getPoheId", null);
__decorate([
    (0, common_1.Get)(':number'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "getPoheNumber", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "createPohe", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "updatePohe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoheController.prototype, "deletePohe", null);
PoheController = __decorate([
    (0, common_1.Controller)('purchase-order-header'),
    __metadata("design:paramtypes", [purchase_order_header_service_1.PoheService])
], PoheController);
exports.PoheController = PoheController;
//# sourceMappingURL=purchase-order-header.controller.js.map