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
exports.UserProfilesController = void 0;
const common_1 = require("@nestjs/common");
const user_profiles_service_1 = require("../../../Service/Users/user-profiles/user-profiles.service");
const UserProfiles_1 = require("../../../entities/UserProfiles");
let UserProfilesController = class UserProfilesController {
    constructor(userProfilesService) {
        this.userProfilesService = userProfilesService;
    }
    create(item) {
        return this.userProfilesService.create(item);
    }
    findAll() {
        return this.userProfilesService.findAll();
    }
    update(id, item) {
        return this.userProfilesService.update(+id, item);
    }
    remove(id) {
        return this.userProfilesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserProfiles_1.UserProfiles]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserProfiles_1.UserProfiles]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "remove", null);
UserProfilesController = __decorate([
    (0, common_1.Controller)('user-profiles'),
    __metadata("design:paramtypes", [user_profiles_service_1.UserProfilesService])
], UserProfilesController);
exports.UserProfilesController = UserProfilesController;
//# sourceMappingURL=user-profiles.controller.js.map