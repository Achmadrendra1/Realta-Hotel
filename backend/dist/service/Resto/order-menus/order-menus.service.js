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
exports.OrderMenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const OrderMenuDetail_1 = require("../../../entities/OrderMenuDetail");
const OrderMenus_1 = require("../../../entities/OrderMenus");
const typeorm_2 = require("typeorm");
let OrderMenusService = class OrderMenusService {
    constructor(orderMenuRepository, orderDetailRepository) {
        this.orderMenuRepository = orderMenuRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    async getOrderMenus() {
        return await this.orderMenuRepository.find();
    }
    async getOrderNumber(data) {
        return await this.orderMenuRepository.query(`SELECT * FROM resto.ordermenuscomplete($1)`, [data.orderNumber]);
    }
    async getCodeDesc() {
        const buildQuery = this.orderMenuRepository.createQueryBuilder('number_menus');
        const number = await buildQuery
            .select('number_menus.ormeOrderNumber')
            .orderBy('number_menus.ormeOrderNumber', 'DESC')
            .getOne();
        return number;
    }
    async getCode() {
        let fulldate = new Date();
        let year = fulldate.getFullYear().toString();
        let month = (fulldate.getMonth() + 1);
        let monthstr = month < 10 ? '0' + month : month;
        let day = fulldate.getDate();
        let daystr = day < 10 ? '0' + day : day;
        let date = year + monthstr + daystr;
        let generate = 'MENUS#20230225%';
        const buildQuery = this.orderMenuRepository.createQueryBuilder('order_menus');
        const ormeOrderNumber = await buildQuery
            .select('order_menus.ormeOrderNumber')
            .where('order_menus.ormeOrderNumber LIKE :ormeOrderNumber', { ormeOrderNumber: `${generate}%` })
            .getMany();
        return ormeOrderNumber;
    }
    async addOrderMenus(data) {
        const orderNumber = data[0].summary.ormeOrderNumber;
        const date = new Date();
        const item = Number(data[0].summary.ormeTotalItem);
        const disc = Number(data[0].summary.ormeDisc);
        const amount = Number(data[0].summary.ormeTotalAmount);
        const pay = 'BO';
        const paid = 'B';
        const userid = Number(data[0].summary.ormeUser);
        let cart = data[0].detail;
        try {
            const ordermenu = await this.orderMenuRepository.query('SELECT * FROM resto.orders($1, $2, $3, $4, $5, $6, $7, $8)', [orderNumber, date, item, disc, amount, pay, paid, userid]);
            const orme_id = ordermenu[0].orders;
            cart.map(async (row) => {
                await this.orderDetailRepository.insert({
                    ormePrice: row.remeprice,
                    ormeQty: row.quantity,
                    ormeSubtotal: row.subtotal,
                    omdeOrme: orme_id,
                    omdeReme: row.remeid
                });
            });
            return orme_id;
        }
        catch (err) {
            throw err;
        }
        finally {
        }
    }
    async deleteOrder(param) {
        return this.orderMenuRepository.delete(param.id);
    }
};
OrderMenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(OrderMenus_1.OrderMenus)),
    __param(1, (0, typeorm_1.InjectRepository)(OrderMenuDetail_1.OrderMenuDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderMenusService);
exports.OrderMenusService = OrderMenusService;
//# sourceMappingURL=order-menus.service.js.map