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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const employee_service_1 = require("../../../Service/HR/employee/employee.service");
const job_role_service_1 = require("../../../Service/HR/job-role/job-role.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService, jobRoleService) {
        this.employeeService = employeeService;
        this.jobRoleService = jobRoleService;
    }
    allEmployee() {
        return this.employeeService.getEmployee();
    }
    async detailEmployee(param) {
        const profile = await this.employeeService.employeeDetail(param);
        const deptHist = await this.employeeService.getDeptHistory(param);
        const payHist = await this.employeeService.getPayHistory(param);
        return {
            employees: profile[0],
            deptHist,
            payHist,
        };
    }
    getPhoto(file, res) {
        return res.sendFile(file, { root: (0, path_1.join)('public/employeephoto') });
    }
    async addEmployees(file, body) {
        const job = await this.jobRoleService.findAJob(parseInt(body.jobId));
        return await this.employeeService.addEmployee(body, file, job.joroName);
    }
    async updatePhotoEmp(file, body) {
        await this.employeeService.updatePhotos(body.id, file);
        return this.employeeService.employeeDetail(body.id);
    }
    mutationsEmployee(body) {
        return this.employeeService.addMutations(body);
    }
    payHistory(body) {
        return this.employeeService.addPay(body);
    }
    async updateEmployee(body) {
        const job = await this.jobRoleService.findAJob(parseInt(body.jobId));
        return await this.employeeService.updateEmployee(body, job.joroName);
    }
    async deleteEmployees(id) {
        return await this.employeeService.deleteEmployee(id);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "allEmployee", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "detailEmployee", null);
__decorate([
    (0, common_1.Get)('public/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "getPhoto", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/employeephoto',
            filename(req, file, callback) {
                const filenames = file.originalname.split('.');
                callback(null, filenames[0] + Date.now() + '.' + filenames[filenames.length - 1]);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "addEmployees", null);
__decorate([
    (0, common_1.Put)('empfoto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/employeephoto',
            filename(req, file, callback) {
                const filenames = file.originalname.split('.');
                callback(null, filenames[0] + Date.now() + '.' + filenames[filenames.length - 1]);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updatePhotoEmp", null);
__decorate([
    (0, common_1.Post)('/mutation/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "mutationsEmployee", null);
__decorate([
    (0, common_1.Post)('/payhist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "payHistory", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployees", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        job_role_service_1.JobRoleService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map