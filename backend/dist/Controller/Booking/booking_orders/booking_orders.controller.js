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
exports.BookingOrdersController = void 0;
const common_1 = require("@nestjs/common");
const booking_orders_service_1 = require("../../../Service/Booking/booking_orders/booking_orders.service");
const hotels_service_1 = require("../../../Service/Hotel/hotels/hotels.service");
let BookingOrdersController = class BookingOrdersController {
    constructor(BookingOrdersService, hotelsService) {
        this.BookingOrdersService = BookingOrdersService;
        this.hotelsService = hotelsService;
    }
    findAllBookingOrders() {
        return this.BookingOrdersService.findAll();
    }
    getSpHotel() {
        return this.BookingOrdersService.findSpHotel();
    }
    getSpFacility() {
        return this.BookingOrdersService.findSpFacility();
    }
    getSpReview() {
        return this.BookingOrdersService.findSpReview();
    }
    findAllId(params) {
        return this.BookingOrdersService.findById(params.id);
    }
    findLastBooking() {
        return this.BookingOrdersService.findLastBooking();
    }
    findInvoice() {
        return this.BookingOrdersService.getInvoice();
    }
    async createBookingOrdersFinal(body) {
        return await this.BookingOrdersService.createBookingOrdersFinal(body);
    }
    createBookingOrders(body) {
        return this.BookingOrdersService.createBookingOrders(body);
    }
    updateBookingOrders(params, body) {
        return this.BookingOrdersService.updateBookingOrders(params.id, body);
    }
    deleteBookingOrders(params) {
        return this.BookingOrdersService.deleteBookingOrders(params.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "findAllBookingOrders", null);
__decorate([
    (0, common_1.Get)('hotel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "getSpHotel", null);
__decorate([
    (0, common_1.Get)('Faci'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "getSpFacility", null);
__decorate([
    (0, common_1.Get)('Review'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "getSpReview", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "findAllId", null);
__decorate([
    (0, common_1.Get)('last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "findLastBooking", null);
__decorate([
    (0, common_1.Get)('invoice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "findInvoice", null);
__decorate([
    (0, common_1.Post)('create/final'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingOrdersController.prototype, "createBookingOrdersFinal", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "createBookingOrders", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "updateBookingOrders", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingOrdersController.prototype, "deleteBookingOrders", null);
BookingOrdersController = __decorate([
    (0, common_1.Controller)('booking-orders'),
    __metadata("design:paramtypes", [booking_orders_service_1.BookingOrdersService, hotels_service_1.HotelsService])
], BookingOrdersController);
exports.BookingOrdersController = BookingOrdersController;
//# sourceMappingURL=booking_orders.controller.js.map