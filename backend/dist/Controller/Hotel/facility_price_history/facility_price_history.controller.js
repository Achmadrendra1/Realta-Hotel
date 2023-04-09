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
exports.FacilityPriceHistoryController = void 0;
const common_1 = require("@nestjs/common");
const facility_price_history_service_1 = require("../../../Service/Hotel/facility_price_history/facility_price_history.service");
let FacilityPriceHistoryController = class FacilityPriceHistoryController {
    constructor(FaphService) {
        this.FaphService = FaphService;
    }
    getFaph() {
        return this.FaphService.findAllFaph();
    }
    getFaphId(id) {
        return this.FaphService.findByFaphId(id);
    }
    UpdateFaph(id, body) {
        return this.FaphService.UpdateFaph(id, body);
    }
    addFaph(body) {
        return this.FaphService.addNewFaph(body);
    }
    DeleteHore(id) {
        return this.FaphService.deleteFaph(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FacilityPriceHistoryController.prototype, "getFaph", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityPriceHistoryController.prototype, "getFaphId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('if')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FacilityPriceHistoryController.prototype, "UpdateFaph", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityPriceHistoryController.prototype, "addFaph", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityPriceHistoryController.prototype, "DeleteHore", null);
FacilityPriceHistoryController = __decorate([
    (0, common_1.Controller)('facility-price-history'),
    __metadata("design:paramtypes", [facility_price_history_service_1.FacilityPriceHistoryService])
], FacilityPriceHistoryController);
exports.FacilityPriceHistoryController = FacilityPriceHistoryController;
//# sourceMappingURL=facility_price_history.controller.js.map