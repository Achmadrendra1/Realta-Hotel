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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Vendor_1 = require("../../../entities/Vendor");
let VendorService = class VendorService {
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async findAllVendor() {
        return await this.vendorRepository.find();
    }
    async findVendorId(id) {
        return await this.vendorRepository.find({ where: { vendorId: id } });
    }
    async findVendorName(vendor) {
        return await this.vendorRepository.find({ where: { vendorName: (0, typeorm_2.Like)('%' + vendor.vendorName + '%') } });
    }
    async addVendor(vendor) {
        await this.vendorRepository.save({
            vendorName: vendor.vendorName,
            vendorActive: vendor.vendorActive,
            vendorPriority: vendor.vendorPriority,
            vendorRegisterDate: vendor.vendorRegisterDate,
            vendorWeburl: vendor.vendorWeburl,
            vendorModifiedDate: new Date()
        });
        const res = await this.findAllVendor();
        return ({ message: `Congrats, you have new Vendor`, result: res });
    }
    async editVendor(id, vendor) {
        try {
            await this.vendorRepository.update({
                vendorId: id
            }, {
                vendorName: vendor.vendorName,
                vendorActive: vendor.vendorActive,
                vendorPriority: vendor.vendorPriority,
                vendorRegisterDate: vendor.vendorRegisterDate,
                vendorWeburl: vendor.vendorWeburl,
                vendorModifiedDate: new Date()
            });
            return { message: `Congrats, you're vendor has been changed` };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async dropVendor(id) {
        await this.vendorRepository.delete({ vendorId: id });
        return `Congrats, you're vendor has been deleted`;
    }
};
VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Vendor_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=vendor.service.js.map