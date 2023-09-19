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
exports.BookingOrderDetailExtraController = void 0;
const common_1 = require("@nestjs/common");
const booking_order_detail_extra_service_1 = require("../../../Service/Booking/booking-order-detail-extra/booking-order-detail-extra.service");
let BookingOrderDetailExtraController = class BookingOrderDetailExtraController {
    constructor(BookingOrderDetailExtraService) {
        this.BookingOrderDetailExtraService = BookingOrderDetailExtraService;
    }
    findAllBookingOrderDetailExtra() {
        return this.BookingOrderDetailExtraService.findAll();
    }
    findAllId(params) {
        return this.BookingOrderDetailExtraService.findAllId(params.id);
    }
    createBookingOrderDetailExtra(body) {
        return this.BookingOrderDetailExtraService.createBookingOrderDetailExtra(body);
    }
    createExtraMultiple(body) {
        return this.BookingOrderDetailExtraService.createExtraMultiple(body);
    }
    updateBookingOrderDetailExtra(params, body) {
        return this.BookingOrderDetailExtraService.updateBookingOrderDetailExtra(params.id, body);
    }
    deleteBookingOrderDetailExtra(params) {
        return this.BookingOrderDetailExtraService.deleteBookingOrderDetailExtra(params.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "findAllBookingOrderDetailExtra", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "findAllId", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "createBookingOrderDetailExtra", null);
__decorate([
    (0, common_1.Post)('createArray'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "createExtraMultiple", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "updateBookingOrderDetailExtra", null);
__decorate([
    (0, common_1.Delete)('delete/id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrderDetailExtraController.prototype, "deleteBookingOrderDetailExtra", null);
BookingOrderDetailExtraController = __decorate([
    (0, common_1.Controller)('booking-order-detail-extra'),
    __metadata("design:paramtypes", [booking_order_detail_extra_service_1.BookingOrderDetailExtraService])
], BookingOrderDetailExtraController);
exports.BookingOrderDetailExtraController = BookingOrderDetailExtraController;
//# sourceMappingURL=booking-order-detail-extra.controller.js.map