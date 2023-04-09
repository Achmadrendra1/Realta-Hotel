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
exports.PaymentTransactionController = void 0;
const common_1 = require("@nestjs/common");
const payment_transaction_service_1 = require("../../../Service/Payment/payment-transaction/payment-transaction.service");
let PaymentTransactionController = class PaymentTransactionController {
    constructor(payService) {
        this.payService = payService;
    }
    getPagination(query) {
        return this.payService.getPagination(query);
    }
    getAll(query) {
        return this.payService.getAll(query);
    }
    createPayment(body) {
        return this.payService.createData(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "getPagination", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentTransactionController.prototype, "createPayment", null);
PaymentTransactionController = __decorate([
    (0, common_1.Controller)('payment-transaction'),
    __metadata("design:paramtypes", [payment_transaction_service_1.PaymentTransactionService])
], PaymentTransactionController);
exports.PaymentTransactionController = PaymentTransactionController;
//# sourceMappingURL=payment-transaction.controller.js.map