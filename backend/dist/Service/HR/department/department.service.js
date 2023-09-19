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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Department_1 = require("../../../entities/Department");
const typeorm_2 = require("typeorm");
let DepartmentService = class DepartmentService {
    constructor(deptStore) {
        this.deptStore = deptStore;
    }
    async getDept() {
        return await this.deptStore.find();
    }
    async updateDept(id, data) {
        const date = new Date();
        await this.deptStore
            .createQueryBuilder()
            .update(Department_1.Department)
            .set({ deptName: data === null || data === void 0 ? void 0 : data.name, deptModifiedDate: date })
            .where({ deptId: id })
            .execute();
        return {
            deptId: id,
            deptName: data.name,
            deptModifiedDate: date,
        };
    }
    async addDept(data) {
        return await this.deptStore.save(data);
    }
    async delDept(id) {
        await this.deptStore.delete({ deptId: id });
        return {
            deptId: id,
            status: 'Success',
        };
    }
    async getSelect() {
        const data = await this.deptStore.find();
        const items = [];
        data.map((item) => {
            items.push({
                value: item.deptId,
                label: item.deptName,
            });
        });
        return items;
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Department_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map