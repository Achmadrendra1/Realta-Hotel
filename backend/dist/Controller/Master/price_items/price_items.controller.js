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
exports.PriceItemsController = void 0;
const common_1 = require("@nestjs/common");
const price_items_service_1 = require("../../../Service/Master/price_items/price_items.service");
const PriceItems_1 = require("../../../entities/PriceItems");
let PriceItemsController = class PriceItemsController {
    constructor(PriceItemsService) {
        this.PriceItemsService = PriceItemsService;
    }
    findall() {
        return this.PriceItemsService.findAllPriceItems();
    }
    findById(id) {
        return this.PriceItemsService.findOnePriceItems(id);
    }
    priceName(params) {
        return this.PriceItemsService.getPriceByName(params);
    }
    pricehotel(params) {
        return this.PriceItemsService.getPriceItemByHotelName(params);
    }
    async createPriceItems(data) {
        const PriceItems = await this.PriceItemsService.createPriceItems(data);
        if (!PriceItems) {
            return 'failed insert to regions';
        }
        else {
            return ' success insert to regions';
        }
    }
    update(params, body) {
        return this.PriceItemsService.updatePriceItems(params.id, body);
    }
    remove(params) {
        return this.PriceItemsService.deletePriceItems(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "priceName", null);
__decorate([
    (0, common_1.Get)('/hotel/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "pricehotel", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PriceItems_1.PriceItems]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "createPriceItems", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceItemsController.prototype, "remove", null);
PriceItemsController = __decorate([
    (0, common_1.Controller)('price'),
    __metadata("design:paramtypes", [price_items_service_1.PriceItemsService])
], PriceItemsController);
exports.PriceItemsController = PriceItemsController;
//# sourceMappingURL=price_items.controller.js.map