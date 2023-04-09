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
exports.PaymentGatewayController = void 0;
const common_1 = require("@nestjs/common");
const payment_gateway_service_1 = require("../../../Service/Payment/payment-gateway/payment-gateway.service");
let PaymentGatewayController = class PaymentGatewayController {
    constructor(payService) {
        this.payService = payService;
    }
    getAllBank() {
        return this.payService.getAll();
    }
    getPagination(query) {
        return this.payService.getPagination(query);
    }
    getBankId(params) {
        return this.payService.getbyId(params.id);
    }
    createNewBank(body) {
        return this.payService.createPaga(body);
    }
    updateBank(params, body) {
        return this.payService.updatePaga(params.id, body);
    }
    deleteBank(params) {
        return this.payService.deletePaga(params.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "getAllBank", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "getPagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "getBankId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "createNewBank", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "updateBank", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "deleteBank", null);
PaymentGatewayController = __decorate([
    (0, common_1.Controller)('payment-gateway'),
    __metadata("design:paramtypes", [payment_gateway_service_1.PaymentGatewayService])
], PaymentGatewayController);
exports.PaymentGatewayController = PaymentGatewayController;
//# sourceMappingURL=payment-gateway.controller.js.map