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
exports.SphoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const StockPhoto_1 = require("../../../entities/StockPhoto");
let SphoService = class SphoService {
    constructor(sphoRepository) {
        this.sphoRepository = sphoRepository;
    }
    async findAllSpho() {
        return await this.sphoRepository.find();
    }
    async findSphoId(id) {
        return await this.sphoRepository.find({ where: { sphoId: id } });
    }
    async findSphoName(stockPhoto) {
        return await this.sphoRepository.find({ where: { sphoPhotoFilename: (0, typeorm_2.Like)('%' + stockPhoto.sphoPhotoFilename + '%') } });
    }
    async addSpho(url, stockPhoto) {
        for (const data of url) {
            await this.sphoRepository.save({
                sphoThumbnailFilename: data.originalname,
                sphoPhotoFilename: data.filename,
                sphoPrimary: stockPhoto.sphoPrimary,
                sphoUrl: data.filename,
                sphoStock: stockPhoto.sphoStock
            });
            const res = await this.findAllSpho();
            return ({ message: `Congrats, you have new Stock photo`, result: res });
        }
    }
    async editSpho(id, spho) {
        try {
            await this.sphoRepository.update({
                sphoId: id
            }, {
                sphoThumbnailFilename: spho.sphoThumbnailFilename,
                sphoPhotoFilename: spho.sphoPhotoFilename,
                sphoPrimary: spho.sphoPrimary,
                sphoUrl: spho.sphoUrl,
                sphoStock: spho.sphoStock
            });
            return { message: `Congrats, you're stock photo has been changed` };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async dropSpho(id) {
        await this.sphoRepository.delete({ sphoId: id });
        return `Congrats, you're stock photo has been deleted`;
    }
};
SphoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(StockPhoto_1.StockPhoto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SphoService);
exports.SphoService = SphoService;
//# sourceMappingURL=stock-photo.service.js.map