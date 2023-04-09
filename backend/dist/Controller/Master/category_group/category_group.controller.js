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
exports.CategoryGroupController = void 0;
const common_1 = require("@nestjs/common");
const category_group_service_1 = require("../../../Service/Master/category_group/category_group.service");
const CategoryGroup_1 = require("../../../entities/CategoryGroup");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let CategoryGroupController = class CategoryGroupController {
    constructor(CategoryGroupService) {
        this.CategoryGroupService = CategoryGroupService;
    }
    findall() {
        return this.CategoryGroupService.findAllCategoryGroup();
    }
    findById(id) {
        return this.CategoryGroupService.findOneCategoryGroup(id);
    }
    categoryName(params) {
        return this.CategoryGroupService.getCategoryGroupByName(params);
    }
    async createCategoryGroup(data) {
        const CategoryGroup = await this.CategoryGroupService.createCategoryGroup(data);
        if (!CategoryGroup) {
            return 'failed insert to Category';
        }
        else {
            return ' success insert to Category';
        }
    }
    async uploadFile(file, body) {
        console.log(file);
        const result = await this.CategoryGroupService.storeFileInfo(file, body);
        if (!result) {
            return 'gagal upload';
        }
        else {
            return {
                message: 'berhasil upload',
                result: result.result,
            };
        }
    }
    getPhoto(fileName, res) {
        return res.sendFile(fileName, { root: (0, path_1.join)('public/upload') });
    }
    update(params, body) {
        return this.CategoryGroupService.updateCategoryGroup(params.id, body);
    }
    remove(params) {
        return this.CategoryGroupService.deleteCategoryGroup(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "categoryName", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryGroup_1.CategoryGroup]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "createCategoryGroup", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: './public/upload',
        storage: (0, multer_1.diskStorage)({
            destination: './public/upload',
            filename(req, file, cb) {
                return cb(null, file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('public/upload/:fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryGroupController.prototype, "getPhoto", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryGroupController.prototype, "remove", null);
CategoryGroupController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_group_service_1.CategoryGroupService])
], CategoryGroupController);
exports.CategoryGroupController = CategoryGroupController;
//# sourceMappingURL=category_group.controller.js.map