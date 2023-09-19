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
exports.RestoMenuPhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const RestoMenuPhotos_1 = require("../../../entities/RestoMenuPhotos");
const typeorm_2 = require("typeorm");
const promises_1 = require("fs/promises");
let RestoMenuPhotosService = class RestoMenuPhotosService {
    constructor(restoMenuPhotoRepository) {
        this.restoMenuPhotoRepository = restoMenuPhotoRepository;
    }
    async getMenuPhotos() {
        return await this.restoMenuPhotoRepository.query('SELECT * FROM resto.resto_menu_photos');
    }
    async getListPhoto(param) {
        const id = Number(param.id);
        return await this.restoMenuPhotoRepository.query(`SELECT * FROM resto.getPhotoMenu(${id})`);
    }
    async addMenuPhoto(file, body) {
        return await this.restoMenuPhotoRepository.insert({
            rempThumbnailFilename: body.rempThumbnailFilename,
            rempPhotoFilename: file.filename,
            rempPrimary: body.rempPrimary,
            rempUrl: file.path,
            rempReme: body.remeId
        });
    }
    async addMultiplePhoto(files, body) {
        const isPrimary = await this.restoMenuPhotoRepository.query('SELECT * FROM resto.isPrimary($1)', [body.remeId]);
        const getcount = isPrimary[0].isprimary;
        for (let i = 0; i < files.length; i++) {
            if (getcount === 0 && i === 0) {
                await this.restoMenuPhotoRepository.insert({
                    rempThumbnailFilename: body.rempThumbnailFilename,
                    rempPhotoFilename: files[i].filename,
                    rempPrimary: '1',
                    rempUrl: files[i].path,
                    rempReme: body.remeId
                });
            }
            else {
                await this.restoMenuPhotoRepository.insert({
                    rempThumbnailFilename: body.rempThumbnailFilename,
                    rempPhotoFilename: files[i].filename,
                    rempPrimary: '0',
                    rempUrl: files[i].path,
                    rempReme: body.remeId
                });
            }
        }
        return 'add successfully';
    }
    async editPrimary(data) {
        data.map(async (row) => {
            await this.restoMenuPhotoRepository.update({
                rempId: row.rempid
            }, {
                rempPrimary: row.rempprimary
            });
        });
        return 'UPDATED SUCCESSFULLY';
    }
    async editMenuPhoto(file, body, param) {
        return await this.restoMenuPhotoRepository.update({
            rempId: param.id
        }, {
            rempPhotoFilename: file.filename,
            rempPrimary: body.rempPrimary,
            rempUrl: file.path,
        });
    }
    async deleteMenuPhoto(param) {
        const id = Number(param.id);
        const img = await this.restoMenuPhotoRepository.findOne({
            where: {
                rempId: id
            }
        });
        if (img) {
            await (0, promises_1.unlink)(img.rempUrl);
            await this.restoMenuPhotoRepository.delete(param.id);
        }
    }
};
RestoMenuPhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RestoMenuPhotos_1.RestoMenuPhotos)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestoMenuPhotosService);
exports.RestoMenuPhotosService = RestoMenuPhotosService;
//# sourceMappingURL=resto-menu-photos.service.js.map