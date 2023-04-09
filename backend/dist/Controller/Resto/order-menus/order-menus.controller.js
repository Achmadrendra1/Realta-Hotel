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
exports.OrderMenusController = void 0;
const common_1 = require("@nestjs/common");
const order_menus_service_1 = require("../../../Service/Resto/order-menus/order-menus.service");
let OrderMenusController = class OrderMenusController {
    constructor(orderMenusService) {
        this.orderMenusService = orderMenusService;
    }
    getOrderMenus() {
        return this.orderMenusService.getOrderMenus();
    }
    getCodeDesc() {
        return this.orderMenusService.getCodeDesc();
    }
    getOrderNumber(data) {
        return this.orderMenusService.getOrderNumber(data);
    }
    getCode() {
        return this.orderMenusService.getCode();
    }
    addOrderMenus(body) {
        return this.orderMenusService.addOrderMenus(body);
    }
    deleteOrder(param) {
        return this.orderMenusService.deleteOrder(param);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "getOrderMenus", null);
__decorate([
    (0, common_1.Get)('/desc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "getCodeDesc", null);
__decorate([
    (0, common_1.Post)('/order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "getOrderNumber", null);
__decorate([
    (0, common_1.Get)('/code'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "getCode", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "addOrderMenus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderMenusController.prototype, "deleteOrder", null);
OrderMenusController = __decorate([
    (0, common_1.Controller)('order-menus'),
    __metadata("design:paramtypes", [order_menus_service_1.OrderMenusService])
], OrderMenusController);
exports.OrderMenusController = OrderMenusController;
//# sourceMappingURL=order-menus.controller.js.map