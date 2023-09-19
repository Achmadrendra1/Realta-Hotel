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
exports.RestoMenuPhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const resto_menu_photos_service_1 = require("../../../Service/Resto/resto-menu-photos/resto-menu-photos.service");
const multer_1 = require("multer");
const Helper_1 = require("./Helper");
const decorators_1 = require("@nestjs/common/decorators");
let RestoMenuPhotosController = class RestoMenuPhotosController {
    constructor(restoMenuPhotos) {
        this.restoMenuPhotos = restoMenuPhotos;
    }
    getMenuPhoto() {
        return this.restoMenuPhotos.getMenuPhotos();
    }
    getListPhoto(param) {
        return this.restoMenuPhotos.getListPhoto(param);
    }
    addMenuPhoto(file, body) {
        return this.restoMenuPhotos.addMenuPhoto(file, body);
    }
    addMultiplePhoto(rempUrl, body) {
        return this.restoMenuPhotos.addMultiplePhoto(rempUrl, body);
    }
    editPrimary(body) {
        return this.restoMenuPhotos.editPrimary(body);
    }
    deleteMenuPhoto(param) {
        return this.restoMenuPhotos.deleteMenuPhoto(param);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "getMenuPhoto", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorators_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "getListPhoto", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('rempUrl', {
        storage: (0, multer_1.diskStorage)({
            destination: Helper_1.Helper.storage,
            filename: Helper_1.Helper.customFileName
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "addMenuPhoto", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('rempUrl', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: Helper_1.Helper.storage,
            filename: Helper_1.Helper.customFileName
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "addMultiplePhoto", null);
__decorate([
    (0, common_1.Put)('/primary'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "editPrimary", null);
__decorate([
    (0, decorators_1.Delete)(':id'),
    __param(0, (0, decorators_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RestoMenuPhotosController.prototype, "deleteMenuPhoto", null);
RestoMenuPhotosController = __decorate([
    (0, common_1.Controller)('resto-menu-photos'),
    __metadata("design:paramtypes", [resto_menu_photos_service_1.RestoMenuPhotosService])
], RestoMenuPhotosController);
exports.RestoMenuPhotosController = RestoMenuPhotosController;
//# sourceMappingURL=resto-menu-photos.controller.js.map