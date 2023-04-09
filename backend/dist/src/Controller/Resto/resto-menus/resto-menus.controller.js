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
exports.RestoMenusController = void 0;
const common_1 = require("@nestjs/common");
const resto_menus_service_1 = require("../../../Service/Resto/resto-menus/resto-menus.service");
let RestoMenusController = class RestoMenusController {
    constructor(restoMenuService) {
        this.restoMenuService = restoMenuService;
    }
    getMenus() {
        return this.restoMenuService.getMenus();
    }
    getMenu(Param) {
        return this.restoMenuService.getMenu(Param);
    }
    getMenuByFacility(Param) {
        return this.restoMenuService.getMenuByFacility(Param);
    }
    getMenuForAdmin(body) {
        return this.restoMenuService.getMenuForAdmin(body);
    }
    getMenuForUser(Param, body) {
        return this.restoMenuService.getMenuForUser(Param, body);
    }
    addMenus(body) {
        return this.restoMenuService.addMenus(body);
    }
    editMenu(Param, Body) {
        return this.restoMenuService.editMenu(Param, Body);
    }
    deleteMenu(param) {
        return this.restoMenuService.deleteMenu(param);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "getMenus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "getMenu", null);
__decorate([
    (0, common_1.Get)('/list/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "getMenuByFacility", null);
__decorate([
    (0, common_1.Post)('menu-dashboard'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "getMenuForAdmin", null);
__decorate([
    (0, common_1.Post)('/user/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "getMenuForUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "addMenus", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "editMenu", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestoMenusController.prototype, "deleteMenu", null);
RestoMenusController = __decorate([
    (0, common_1.Controller)('resto-menus'),
    __metadata("design:paramtypes", [resto_menus_service_1.RestoMenusService])
], RestoMenusController);
exports.RestoMenusController = RestoMenusController;
//# sourceMappingURL=resto-menus.controller.js.map