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
exports.CategoryGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const CategoryGroup_1 = require("../../../entities/CategoryGroup");
const typeorm_2 = require("typeorm");
let CategoryGroupService = class CategoryGroupService {
    constructor(categoryGroupRepository) {
        this.categoryGroupRepository = categoryGroupRepository;
    }
    async findAllCategoryGroup() {
        return await this.categoryGroupRepository.find({
            order: {
                cagroId: 'ASC',
            },
        });
    }
    async findOneCategoryGroup(cagroId) {
        return await this.categoryGroupRepository.findOne({
            where: {
                cagroId: cagroId,
            },
        });
    }
    async getCategoryGroupByName(name) {
        return await this.categoryGroupRepository.find({
            where: {
                cagroName: (0, typeorm_2.Like)(`%${name}%`),
            },
        });
    }
    async createCategoryGroup(data) {
        return await this.categoryGroupRepository.save(this.categoryGroupRepository.create(data));
    }
    async storeFileInfo(file, body) {
        const fileInfo = new CategoryGroup_1.CategoryGroup();
        console.log(file);
        fileInfo.cagroIconUrl = `http://localhost:3600/category/public/upload/${file.filename}`;
        fileInfo.cagroIcon = file.filename;
        fileInfo.cagroName = body.cagroName;
        fileInfo.cagroDescription = body.cagroDescription;
        fileInfo.cagroType = body.cagroType;
        await this.categoryGroupRepository.save(fileInfo);
        const res = await this.categoryGroupRepository.query('select * from master.category_group order by cagro_id');
        return { result: res };
    }
    async updateCategoryGroup(cagroId, data) {
        return await this.categoryGroupRepository
            .update({ cagroId: cagroId }, data)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deleteCategoryGroup(cagroId) {
        return await this.categoryGroupRepository
            .delete({ cagroId: cagroId })
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
};
CategoryGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(CategoryGroup_1.CategoryGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryGroupService);
exports.CategoryGroupService = CategoryGroupService;
//# sourceMappingURL=category_group.service.js.map