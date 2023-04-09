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
exports.ProvincesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Proviences_1 = require("../../../entities/Proviences");
let ProvincesService = class ProvincesService {
    constructor(proviencesRepository) {
        this.proviencesRepository = proviencesRepository;
    }
    async findAllProviences() {
        return await this.proviencesRepository.find({
            order: {
                provId: 'ASC',
            },
        });
    }
    async findOneProviences(provId) {
        return await this.proviencesRepository.findOne({
            where: {
                provId: provId,
            },
        });
    }
    async createProviences(data) {
        const provinces = new Proviences_1.Proviences();
        provinces.provName = data.prov_name;
        provinces.provCountry = data.prov_country_id;
        return await this.proviencesRepository.save(provinces);
    }
    async updateProviences(provId, data) {
        const provinces = new Proviences_1.Proviences();
        provinces.provName = data.prov_name;
        provinces.provCountry = data.prov_country_id;
        return await this.proviencesRepository
            .update({ provId: provId }, provinces)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deleteProviences(provId) {
        return await this.proviencesRepository.delete({ provId: provId });
    }
};
ProvincesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Proviences_1.Proviences)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProvincesService);
exports.ProvincesService = ProvincesService;
//# sourceMappingURL=provinces.service.js.map