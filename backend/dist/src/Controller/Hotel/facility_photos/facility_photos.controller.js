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
exports.FacilityPhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const upload_config_1 = require("../../../Service/Hotel/Middleware/upload.config");
const facility_photos_service_1 = require("../../../Service/Hotel/facility_photos/facility_photos.service");
let FacilityPhotosController = class FacilityPhotosController {
    constructor(FaphoService) {
        this.FaphoService = FaphoService;
    }
    getFapho() {
        return this.FaphoService.findAllFapho();
    }
    getPhoto(filename, res) {
        return res.sendFile(filename, {
            root: (0, path_1.join)('public', 'FacilitiesPhotos'),
        });
    }
    getFaphoId(id) {
        return this.FaphoService.findByFaphoId(id);
    }
    UpdateFapho(hotelId, body) {
        return this.FaphoService.UpdateFapho(hotelId, body);
    }
    addFapho(file, body) {
        return this.FaphoService.addNewFapho(file, body);
    }
    DeleteFapho(id) {
        return this.FaphoService.deleteFapho(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "getFapho", null);
__decorate([
    (0, common_1.Get)(`:filename`),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "getPhoto", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "getFaphoId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "UpdateFapho", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('faphoUrl', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './public/FacilitiesPhotos',
            filename: upload_config_1.UploadConfig.PhotoFilename,
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "addFapho", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityPhotosController.prototype, "DeleteFapho", null);
FacilityPhotosController = __decorate([
    (0, common_1.Controller)('facility-photos'),
    __metadata("design:paramtypes", [facility_photos_service_1.FacilityPhotosService])
], FacilityPhotosController);
exports.FacilityPhotosController = FacilityPhotosController;
//# sourceMappingURL=facility_photos.controller.js.map