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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("../../../Service/HR/department/department.service");
let DepartmentController = class DepartmentController {
    constructor(deptStore) {
        this.deptStore = deptStore;
    }
    allDepartment() {
        return this.deptStore.getDept();
    }
    updateDepartment(param, body) {
        return this.deptStore.updateDept(param, body);
    }
    createDepartment(body) {
        const date = new Date();
        const datas = {
            deptId: null,
            deptName: body.name,
            deptModifiedDate: date,
        };
        return this.deptStore.addDept(datas);
    }
    deleletDepartment(param) {
        return this.deptStore.delDept(param);
    }
    selectInput() {
        return this.deptStore.getSelect();
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "allDepartment", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleletDepartment", null);
__decorate([
    (0, common_1.Get)('/select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "selectInput", null);
DepartmentController = __decorate([
    (0, common_1.Controller)('dept'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map