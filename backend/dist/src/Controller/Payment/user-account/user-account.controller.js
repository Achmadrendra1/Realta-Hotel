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
exports.UserAccountController = void 0;
const common_1 = require("@nestjs/common");
const user_account_service_1 = require("../../../Service/Payment/user-account/user-account.service");
let UserAccountController = class UserAccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getAllData() {
        return this.accountService.getAll();
    }
    getPaga(params) {
        return this.accountService.getAccount(params.id);
    }
    getJoin() {
        return this.accountService.getDataWithJoin();
    }
    getByAccNumber(body) {
        return this.accountService.getByAccNumber(body.usacAccountNumber);
    }
    createAcc(body) {
        return this.accountService.createAccount(body);
    }
    checkSecure(body) {
        return this.accountService.checkSecureCode(body);
    }
    updateSecureCode(body) {
        return this.accountService.updateSecureCode(body);
    }
    updateAcc(body) {
        return this.accountService.updateAccount(body.usacAccountNumber, body);
    }
    deleteAcc(params) {
        return this.accountService.deleteAccount(params.accNumber);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "getPaga", null);
__decorate([
    (0, common_1.Get)('/join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "getJoin", null);
__decorate([
    (0, common_1.Post)('one'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "getByAccNumber", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "createAcc", null);
__decorate([
    (0, common_1.Post)('/check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "checkSecure", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "updateSecureCode", null);
__decorate([
    (0, common_1.Put)('/updateAcc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "updateAcc", null);
__decorate([
    (0, common_1.Delete)(':accNumber'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAccountController.prototype, "deleteAcc", null);
UserAccountController = __decorate([
    (0, common_1.Controller)('user-account'),
    __metadata("design:paramtypes", [user_account_service_1.UserAccountService])
], UserAccountController);
exports.UserAccountController = UserAccountController;
//# sourceMappingURL=user-account.controller.js.map