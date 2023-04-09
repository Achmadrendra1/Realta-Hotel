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
exports.RestoMenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const RestoMenus_1 = require("../../../entities/RestoMenus");
const typeorm_2 = require("typeorm");
let RestoMenusService = class RestoMenusService {
    constructor(restoMenusRepository) {
        this.restoMenusRepository = restoMenusRepository;
    }
    async getMenus() {
        return await this.restoMenusRepository.find();
    }
    async getMenuByFacility(Param) {
        return await this.restoMenusRepository.query(`SELECT * FROM resto.listMenu(${Param.id})`);
    }
    async getMenuForUser(Param, body) {
        const searchLower = body.search.toLowerCase();
        const data = await this.restoMenusRepository.query('SELECT * FROM resto.listMenuUser($1, $2, $3, $4)', [Param.id, searchLower, body.currentpage, body.sortedData]);
        const selectcount = await this.restoMenusRepository.query('SELECT * FROM resto.count_menu($1, $2)', [Param.id, searchLower]);
        const counts = selectcount[0].count_menu;
        const result = {
            data,
            counts
        };
        return result;
    }
    async getMenuForAdmin(body) {
        const searchLower = body.search.toLowerCase();
        const data = await this.restoMenusRepository.query('SELECT * FROM resto.restomenu_dashboard($1, $2)', [searchLower, body.currentpage]);
        const selectcount = await this.restoMenusRepository.query('SELECT * FROM resto.count_menu_dashboard($1)', [searchLower]);
        const counts = selectcount[0].count_menu_dashboard;
        const result = {
            data,
            counts
        };
        return result;
    }
    async getMenu(param) {
        const remeid = Number(param.id);
        return await this.restoMenusRepository.query('SELECT * FROM resto.resto_menus WHERE reme_id = ($1)', [remeid]);
    }
    async addMenus(body) {
        const dateForPostgre = new Date();
        return await this.restoMenusRepository.insert({
            remeFaci: body.remeFaciId,
            remeName: body.remeName,
            remeDescription: body.remeDescription,
            remePrice: body.remePrice,
            remeStatus: body.remeStatus,
            remeModifiedDate: dateForPostgre
        });
    }
    async editMenu(param, body) {
        const date = new Date();
        return await this.restoMenusRepository.update({
            remeId: param.id
        }, {
            remeFaci: body.remeFaciId,
            remeName: body.remeName,
            remeDescription: body.remeDescription,
            remePrice: body.remePrice,
            remeStatus: body.remeStatus,
            remeModifiedDate: date
        });
    }
    async deleteMenu(param) {
        return await this.restoMenusRepository.delete(param.id);
    }
};
RestoMenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RestoMenus_1.RestoMenus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestoMenusService);
exports.RestoMenusService = RestoMenusService;
//# sourceMappingURL=resto-menus.service.js.map