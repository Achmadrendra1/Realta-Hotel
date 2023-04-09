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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Regions_1 = require("../../../entities/Regions");
const Country_1 = require("../../../entities/Country");
const Proviences_1 = require("../../../entities/Proviences");
const Address_1 = require("../../../entities/Address");
let RegionsService = class RegionsService {
    constructor(regionsRepository, countryRepository, provincesRepository, addressRepository) {
        this.regionsRepository = regionsRepository;
        this.countryRepository = countryRepository;
        this.provincesRepository = provincesRepository;
        this.addressRepository = addressRepository;
    }
    async getLocation() {
        return await this.regionsRepository.query('select * from master.locationsAll() order by addr_id');
    }
    async getLocationRC() {
        return await this.regionsRepository.query('select * from master.locationsRC() order by country_id');
    }
    async getLocationRCP() {
        return await this.regionsRepository.query('select * from master.locationsRCP() order by prov_id');
    }
    async createRC(data) {
        await this.regionsRepository.save(this.regionsRepository.create(data));
        await this.countryRepository.save(this.countryRepository.create(data));
    }
    async createRCP(data) {
        await this.regionsRepository.save(this.regionsRepository.create(data));
        await this.countryRepository.save(this.countryRepository.create(data));
        await this.provincesRepository.save(this.provincesRepository.create(data));
    }
    async createRCPA(data) {
        await this.regionsRepository.save(this.regionsRepository.create(data));
        await this.countryRepository.save(this.countryRepository.create(data));
        await this.provincesRepository.save(this.provincesRepository.create(data));
        await this.addressRepository.save(this.addressRepository.create(data));
    }
    async findAllRegions() {
        return await this.regionsRepository.query('select * from master.regions order by region_code');
    }
    async findOneRegions(regionCode) {
        return await this.regionsRepository.findOne({
            where: {
                regionCode: regionCode,
            },
        });
    }
    async createRegions(data) {
        return await this.regionsRepository.save(data);
    }
    async updateRegions(regionCode, data) {
        const regions = new Regions_1.Regions();
        regions.regionName = data.region_name;
        return await this.regionsRepository
            .update({ regionCode: regionCode }, regions)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deleteRegions(regionCode) {
        return await this.regionsRepository.delete({ regionCode: regionCode });
    }
};
RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Regions_1.Regions)),
    __param(1, (0, typeorm_1.InjectRepository)(Country_1.Country)),
    __param(2, (0, typeorm_1.InjectRepository)(Proviences_1.Proviences)),
    __param(3, (0, typeorm_1.InjectRepository)(Address_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RegionsService);
exports.RegionsService = RegionsService;
//# sourceMappingURL=regions.service.js.map