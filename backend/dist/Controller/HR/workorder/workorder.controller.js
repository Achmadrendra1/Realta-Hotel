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
exports.WorkorderController = void 0;
const common_1 = require("@nestjs/common");
const workorder_service_1 = require("../../../Service/HR/workorder/workorder.service");
let WorkorderController = class WorkorderController {
    constructor(workorder) {
        this.workorder = workorder;
    }
    workOrders() {
        return this.workorder.getWorkOrders();
    }
    serviceTask() {
        return this.workorder.getService();
    }
    workOrderDetail(id) {
        return this.workorder.getDeatils(id);
    }
    addWorkOrder(body) {
        return this.workorder.addWorkOrder(body);
    }
    addWorkDetail(body) {
        return this.workorder.addWorkDetail(body);
    }
    updateDetails(body) {
        return this.workorder.updateWorkDetail(body);
    }
    deleteWorkDetail(param) {
        return this.workorder.deleteDetail(param);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "workOrders", null);
__decorate([
    (0, common_1.Get)('/task'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "serviceTask", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "workOrderDetail", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "addWorkOrder", null);
__decorate([
    (0, common_1.Post)('/details'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "addWorkDetail", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "updateDetails", null);
__decorate([
    (0, common_1.Delete)('/del/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkorderController.prototype, "deleteWorkDetail", null);
WorkorderController = __decorate([
    (0, common_1.Controller)('workorder'),
    __metadata("design:paramtypes", [workorder_service_1.WorkorderService])
], WorkorderController);
exports.WorkorderController = WorkorderController;
//# sourceMappingURL=workorder.controller.js.map