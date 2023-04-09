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
exports.VeproService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const VendorProduct_1 = require("../../../entities/VendorProduct");
let VeproService = class VeproService {
    constructor(veproRepository) {
        this.veproRepository = veproRepository;
    }
    async findAllVepro() {
        return await this.veproRepository.query('select * from purchasing.getALLVendorStock()');
    }
    async findVeproId(id) {
        return await this.veproRepository.query('select * from purchasing.getALLVendorStock() where vestock_id = $1', [id]);
    }
    async addVepro(vepro) {
        await this.veproRepository.save({
            veproQtyStocked: vepro.vestock_qty_stocked,
            veproQtyRemaining: vepro.vestock_qty_remaining,
            veproPrice: vepro.vestock_price,
            veproStock: vepro.vestock_name,
            veproVendor: vepro.vestock_vendor_id
        });
        const res = await this.findAllVepro();
        return ({ message: `Congrats, you have new Vendor Product`, result: res });
    }
    async editVepro(id, vepro) {
        try {
            await this.veproRepository.update({
                veproId: id
            }, {
                veproStock: vepro.vestock_name,
                veproQtyStocked: vepro.vestock_qty_stocked,
                veproQtyRemaining: vepro.vestock_qty_remaining,
                veproPrice: vepro.vestock_price
            });
            const res = await this.findVeproId(id);
            return {
                message: `Congrats, you're vendor product has been changed`,
                result: res
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async dropVepro(id) {
        await this.veproRepository.delete({ veproId: id });
        return `Congrats, you're vendor product has been deleted`;
    }
};
VeproService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(VendorProduct_1.VendorProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VeproService);
exports.VeproService = VeproService;
//# sourceMappingURL=vendor-product.service.js.map