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
exports.UserBreakfeastController = void 0;
const common_1 = require("@nestjs/common");
const user_breakfeast_service_1 = require("../../../Service/Booking/user-breakfeast/user-breakfeast.service");
let UserBreakfeastController = class UserBreakfeastController {
    constructor(UserBreakfeastService) {
        this.UserBreakfeastService = UserBreakfeastService;
    }
    findAllUserBreakfeast() {
        return this.UserBreakfeastService.findAll();
    }
    findAllId(params) {
        return this.UserBreakfeastService.findAllId(params.id);
    }
    createUserBreakfeast(body) {
        return this.UserBreakfeastService.createUserBreakfeast(body);
    }
    updateUserBreakfeast(params, body) {
        return this.UserBreakfeastService.updateUserBreakfeast(params.id, body);
    }
    deleteUserBreakfeast(params) {
        return this.UserBreakfeastService.deleteUserBreakfeast(params.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserBreakfeastController.prototype, "findAllUserBreakfeast", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserBreakfeastController.prototype, "findAllId", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserBreakfeastController.prototype, "createUserBreakfeast", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserBreakfeastController.prototype, "updateUserBreakfeast", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserBreakfeastController.prototype, "deleteUserBreakfeast", null);
UserBreakfeastController = __decorate([
    (0, common_1.Controller)('user-breakfeast'),
    __metadata("design:paramtypes", [user_breakfeast_service_1.UserBreakfeastService])
], UserBreakfeastController);
exports.UserBreakfeastController = UserBreakfeastController;
//# sourceMappingURL=user-breakfeast.controller.js.map