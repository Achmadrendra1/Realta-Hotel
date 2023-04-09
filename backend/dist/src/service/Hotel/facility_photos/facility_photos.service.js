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
exports.FacilityPhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const FacilityPhoto_1 = require("../../../entities/FacilityPhoto");
const typeorm_2 = require("typeorm");
let FacilityPhotosService = class FacilityPhotosService {
    constructor(FaphoRepsitory) {
        this.FaphoRepsitory = FaphoRepsitory;
    }
    async findAllFapho() {
        return await this.FaphoRepsitory.find({
            relations: {
                faphoFaci: true,
            },
        });
    }
    async findByFaphoId(id) {
        return await this.FaphoRepsitory.find({
            relations: {
                faphoFaci: true,
            },
            where: { faphoFaci: { faciId: id } },
        });
    }
    async addNewFapho(file, fapho) {
        const date = new Date();
        const id = fapho.faphoFaci;
        for (const data of file) {
            await this.FaphoRepsitory.save({
                faphoFaci: fapho.faphoFaci,
                faphoThumbnailFilename: data.originalname,
                faphoPhotoFilename: data.filename,
                faphoPrimary: fapho.faphoPrimary,
                faphoUrl: data.path,
                faphoModifiedDate: date,
            });
        }
        return await this.FaphoRepsitory.find({
            where: { faphoFaci: { faciId: id } },
        })
            .then((result) => {
            return {
                message: `Facilities successfuly added to the system`,
                result: result,
            };
        })
            .catch((error) => {
            return `facilities failed adding to the system` + error;
        });
    }
    async UpdateFapho(id, fapho) {
        return await this.FaphoRepsitory.update({
            faphoId: id,
        }, {
            faphoFaci: fapho.faphoFaci,
            faphoThumbnailFilename: fapho.faphoThumbnailFilename,
            faphoPhotoFilename: fapho.faphoPhotoFilename,
            faphoPrimary: fapho.faphoPrimary,
            faphoUrl: fapho.faphoUrl,
            faphoModifiedDate: fapho.faphoModifiedDate,
        })
            .then((result) => {
            return {
                message: `Facilities successfully updated`,
                result: result,
            };
        })
            .catch((err) => {
            return `Failed to Update Facilities`;
        });
    }
    async deleteFapho(id) {
        await this.FaphoRepsitory.delete(id)
            .then((result) => {
            return {
                message: `Facilities successfully deleted`,
                result: result,
            };
        })
            .catch((error) => {
            return `Failed to Delete` + error;
        });
    }
};
FacilityPhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(FacilityPhoto_1.FacilityPhoto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacilityPhotosService);
exports.FacilityPhotosService = FacilityPhotosService;
//# sourceMappingURL=facility_photos.service.js.map