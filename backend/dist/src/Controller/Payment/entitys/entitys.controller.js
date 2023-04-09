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
exports.EntitysController = void 0;
const common_1 = require("@nestjs/common");
const entitys_service_1 = require("../../../Service/Payment/entitys/entitys.service");
let EntitysController = class EntitysController {
    constructor(entityService) {
        this.entityService = entityService;
    }
    getAllData() {
        return this.entityService.getAll();
    }
    getOne() {
        return this.entityService.getOne();
    }
    createData() {
        return this.entityService.createEntity();
    }
    deleteData(params) {
        return this.entityService.deleteEntity(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntitysController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)('one'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntitysController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntitysController.prototype, "createData", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EntitysController.prototype, "deleteData", null);
EntitysController = __decorate([
    (0, common_1.Controller)('entitys'),
    __metadata("design:paramtypes", [entitys_service_1.EntitysService])
], EntitysController);
exports.EntitysController = EntitysController;
//# sourceMappingURL=entitys.controller.js.map