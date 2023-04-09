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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Address_1 = require("../../../entities/Address");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async findAllAddress() {
        return await this.addressRepository.find({
            order: {
                addrId: 'ASC',
            },
            relations: {
                addrProv: true,
            },
        });
    }
    async findOneAddress(addrId) {
        return await this.addressRepository.findOne({
            where: {
                addrId: addrId,
            },
        });
    }
    async getAddressByName(name) {
        return await this.addressRepository.find({
            where: {
                addrLine2: (0, typeorm_2.Like)(`%${name}%`),
            },
        });
    }
    async getAddressByProvinces(name) {
        return await this.addressRepository.find({
            where: {
                addrProv: {
                    provName: (0, typeorm_2.Like)(`%${name}%`),
                },
            },
        });
    }
    async getAddressByHotel(name) {
        return await this.addressRepository.find({
            where: {
                hotels: {
                    hotelName: (0, typeorm_2.Like)(`%${name}%`),
                },
            },
        });
    }
    async getAddressByUser(name) {
        return await this.addressRepository
            .createQueryBuilder('address')
            .leftJoin('address.userProfiles', 'userProfiles')
            .leftJoin('userProfiles.usproUser', 'user')
            .where('user.fullName = :fullName', { fullName: name })
            .getMany();
    }
    async createAddress(data) {
        const address = new Address_1.Address();
        address.addrLine2 = data.addr_line2;
        address.addrLine1 = data.addr_line1;
        address.addrProv = data.addr_prov_id;
        return await this.addressRepository.save(address);
    }
    async updateAddress(addrId, data) {
        const address = new Address_1.Address();
        address.addrLine2 = data.addr_line2;
        address.addrLine1 = data.addr_line1;
        address.addrProv = data.addr_prov_id;
        return await this.addressRepository
            .update({ addrId: addrId }, address)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deleteAddress(addrId) {
        return await this.addressRepository.delete({ addrId: addrId });
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Address_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map