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
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const country_service_1 = require("../../../Service/Master/country/country.service");
const Country_1 = require("../../../entities/Country");
let CountryController = class CountryController {
    constructor(CountryService) {
        this.CountryService = CountryService;
    }
    findall() {
        return this.CountryService.findAllCountry();
    }
    findById(id) {
        return this.CountryService.findOneCountry(id);
    }
    async create(data) {
        const country = await this.CountryService.createCountry(data);
        if (!country) {
            return ' failed insert to country';
        }
        else {
            return ' success insert to country';
        }
    }
    async update(params, body) {
        return this.CountryService.updateCountry(params.id, body);
    }
    remove(params) {
        const result = this.CountryService.deleteCountry(params.id);
        if (result) {
            return `data hasbeen deleted`;
        }
        else {
            return `gagal`;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Country_1.Country]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CountryController.prototype, "remove", null);
CountryController = __decorate([
    (0, common_1.Controller)('country'),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
exports.CountryController = CountryController;
//# sourceMappingURL=country.controller.js.map