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
exports.UsersPasswordController = void 0;
const common_1 = require("@nestjs/common");
const userPassword_service_1 = require("../../../Service/Users/user-password/userPassword.service");
let UsersPasswordController = class UsersPasswordController {
    constructor(UsersPassword) {
        this.UsersPassword = UsersPassword;
    }
    findById(id) {
        return this.UsersPassword.findById(id);
    }
    ChangePassword(id, newPassword) {
        return this.UsersPassword.ChangePassword(+id, newPassword);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersPasswordController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersPasswordController.prototype, "ChangePassword", null);
UsersPasswordController = __decorate([
    (0, common_1.Controller)('password'),
    __metadata("design:paramtypes", [userPassword_service_1.UserPasswordService])
], UsersPasswordController);
exports.UsersPasswordController = UsersPasswordController;
//# sourceMappingURL=userPassword.controller.js.map