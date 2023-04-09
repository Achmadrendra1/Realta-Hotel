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
exports.BookingOrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const booking_order_detail_service_1 = require("../../../Service/Booking/booking_order_detail/booking_order_detail.service");
let BookingOrderDetailController = class BookingOrderDetailController {
    constructor(BookingOrderDetailService) {
        this.BookingOrderDetailService = BookingOrderDetailService;
    }
    findAllBookingOrderDetail() {
        return this.BookingOrderDetailService.findAll();
    }
    findLastBookingDetail() {
        return this.BookingOrderDetailService.findLastBookingDetail();
    }
    findAllId(params) {
        return this.BookingOrderDetailService.findAllId(params.id);
    }
    createBookingOrderDetail(body) {
        return this.BookingOrderDetailService.createBookingOrderDetail(body);
    }
    updateBookingOrderDetail(params, body) {
        return this.BookingOrderDetailService.updateBookingOrderDetail(params.id, body);
    }
    deleteBookingOrderDetail(params) {
        return this.BookingOrderDetailService.deleteBookingOrderDetail(params.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "findAllBookingOrderDetail", null);
__decorate([
    (0, common_1.Get)('last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "findLastBookingDetail", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "findAllId", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "createBookingOrderDetail", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "updateBookingOrderDetail", null);
__decorate([
    (0, common_1.Delete)('delete/id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailController.prototype, "deleteBookingOrderDetail", null);
BookingOrderDetailController = __decorate([
    (0, common_1.Controller)('booking-order-detail'),
    __metadata("design:paramtypes", [booking_order_detail_service_1.BookingOrderDetailService])
], BookingOrderDetailController);
exports.BookingOrderDetailController = BookingOrderDetailController;
//# sourceMappingURL=booking_order_detail.controller.js.map