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
exports.WorkorderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Employee_1 = require("../../../entities/Employee");
const ServiceTask_1 = require("../../../entities/ServiceTask");
const WorkOrderDetail_1 = require("../../../entities/WorkOrderDetail");
const WorkOrders_1 = require("../../../entities/WorkOrders");
const typeorm_2 = require("typeorm");
let WorkorderService = class WorkorderService {
    constructor(workorder, workorderdetail, service, employee) {
        this.workorder = workorder;
        this.workorderdetail = workorderdetail;
        this.service = service;
        this.employee = employee;
    }
    async getWorkOrders() {
        return await this.workorder.find({ relations: { woroUser: true } });
    }
    async getDeatils(id) {
        return await this.workorderdetail.find({
            where: { wodeWoro: { woroId: id } },
            relations: { wodeEmp: { empUser: true } },
        });
    }
    async getService() {
        const data = await this.service.find();
        const employeeName = await this.employee.find({
            relations: { empUser: true },
        });
        const newData = [];
        const employeData = [];
        employeeName.map((item) => {
            employeData.push({
                label: item.empUser.userFullName,
                value: item.empId,
            });
        });
        data.map((item) => {
            newData.push({
                value: item.setaId,
                label: item.setaName,
            });
        });
        return {
            task: newData,
            employeeName: employeData,
        };
    }
    async addWorkOrder(datas) {
        const newDatas = {
            woroUser: datas.userId,
            woroStartDate: datas.startDate,
            woroStatus: datas.status,
        };
        const newAdd = await this.workorder.save(newDatas);
        return await this.workorder.findOne({
            where: { woroId: newAdd.woroId },
            relations: { woroUser: true },
        });
    }
    async addWorkDetail(datas) {
        const newDatas = {
            wodeWoro: datas.woroId,
            wodeEmpId: datas.empId,
            wodeTaskName: datas.task,
            wodeStatus: 'INPROGRESS',
            wodeNotes: datas.notes,
            wodeSeta: datas.setaId,
            wodeStartDate: new Date(),
        };
        return await this.workorderdetail.save(newDatas);
    }
    async deleteDetail(id) {
        await this.workorderdetail.delete({ wodeId: id });
        return {
            id: id,
            message: 'Success',
        };
    }
    async updateWorkDetail(datas) {
        await this.workorderdetail
            .createQueryBuilder()
            .update(WorkOrderDetail_1.WorkOrderDetail)
            .set({
            wodeEmpId: datas.empId,
            wodeTaskName: datas.task,
            wodeNotes: datas.notes,
            wodeSeta: datas.seta,
        })
            .where({ wodeId: parseInt(datas.wodeId) })
            .execute();
        return await this.workorderdetail.findOne({
            where: { wodeId: datas.wodeId },
            relations: { wodeEmp: { empUser: true } },
        });
    }
};
WorkorderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(WorkOrders_1.WorkOrders)),
    __param(1, (0, typeorm_1.InjectRepository)(WorkOrderDetail_1.WorkOrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(ServiceTask_1.ServiceTask)),
    __param(3, (0, typeorm_1.InjectRepository)(Employee_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WorkorderService);
exports.WorkorderService = WorkorderService;
//# sourceMappingURL=workorder.service.js.map