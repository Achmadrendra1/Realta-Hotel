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
exports.StodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const StockDetail_1 = require("../../../entities/StockDetail");
let StodService = class StodService {
    constructor(stodRepository) {
        this.stodRepository = stodRepository;
    }
    async findAllStod() {
        return await this.stodRepository.query('select * from purchasing.getALLStod()');
    }
    async findStodId(id) {
        return await this.stodRepository.query('select * from purchasing.getALLStod() where stockdet_id = $1', [id]);
    }
    async addNewStod(stod) {
        await this.stodRepository.save({
            stodBarcodeNumber: stod.stodBarcodeNumber,
            stodStatus: stod.stodStatus,
            stodNotes: stod.stodNotes,
            stodFaci: stod.stodFaci,
            stodPohe: stod.stodPohe,
            stodStock: stod.stodStock
        });
        const res = await this.findAllStod();
        return ({ message: `Congrats, you have new Stock Detail`, result: res });
    }
    async editStod(id, stod) {
        try {
            await this.stodRepository.update({
                stodId: id
            }, {
                stodStatus: stod.stockdet_status,
                stodFaci: stod.stockdet_facilities
            });
            const res = await this.findStodId(id);
            return {
                message: `Congrats, you're Stock Detail has been changed`,
                result: res
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async dropStod(id) {
        await this.stodRepository.delete({ stodId: id });
        return `Congrats, you're Stock Detail has been deleted`;
    }
};
StodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(StockDetail_1.StockDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StodService);
exports.StodService = StodService;
//# sourceMappingURL=stock-detail.service.js.map