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
exports.StodController = void 0;
const common_1 = require("@nestjs/common");
const stock_detail_service_1 = require("../../../Service/Purchasing/stock-detail/stock-detail.service");
let StodController = class StodController {
    constructor(stodService) {
        this.stodService = stodService;
    }
    getStod() {
        return this.stodService.findAllStod();
    }
    getStodId(params) {
        return this.stodService.findStodId(params.id);
    }
    createStod(body) {
        return this.stodService.addNewStod(body);
    }
    updateStod(params, body) {
        return this.stodService.editStod(params.id, body);
    }
    deleteStod(params) {
        return this.stodService.dropStod(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StodController.prototype, "getStod", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StodController.prototype, "getStodId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StodController.prototype, "createStod", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StodController.prototype, "updateStod", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StodController.prototype, "deleteStod", null);
StodController = __decorate([
    (0, common_1.Controller)('stock-detail'),
    __metadata("design:paramtypes", [stock_detail_service_1.StodService])
], StodController);
exports.StodController = StodController;
//# sourceMappingURL=stock-detail.controller.js.map