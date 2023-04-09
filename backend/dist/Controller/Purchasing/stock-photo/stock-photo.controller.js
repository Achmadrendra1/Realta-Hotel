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
exports.SphoController = void 0;
const common_1 = require("@nestjs/common");
const stock_photo_service_1 = require("../../../service/Purchasing/stock-photo/stock-photo.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const common_2 = require("@nestjs/common");
let SphoController = class SphoController {
    constructor(sphoService) {
        this.sphoService = sphoService;
    }
    getSpho() {
        return this.sphoService.findAllSpho();
    }
    getSphoFile(filename, res) {
        return res.sendFile(filename, {
            root: (0, path_1.join)('src', 'Service', 'Purchasing', 'stock-photo', 'photos')
        });
    }
    getSphoId(params) {
        return this.sphoService.findSphoId(params.id);
    }
    getSphoName(params) {
        return this.sphoService.findSphoName(params.name);
    }
    createSpho(file, body) {
        return this.sphoService.addSpho(file, body);
    }
    updateSpho(params, body) {
        return this.sphoService.editSpho(params.id, body);
    }
    deleteSpho(params) {
        return this.sphoService.dropSpho(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "getSpho", null);
__decorate([
    (0, common_1.Get)('src/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "getSphoFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "getSphoId", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "getSphoName", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('sphoUrl', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './src/Service/Purchasing/stock-photo/photos',
            filename(req, file, callback) {
                let customName = file.originalname.split('.')[0];
                customName = customName + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${customName}${ext}`;
                callback(null, filename);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "createSpho", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "updateSpho", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SphoController.prototype, "deleteSpho", null);
SphoController = __decorate([
    (0, common_1.Controller)('stock-photo'),
    __metadata("design:paramtypes", [stock_photo_service_1.SphoService])
], SphoController);
exports.SphoController = SphoController;
//# sourceMappingURL=stock-photo.controller.js.map