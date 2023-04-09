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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Stocks_1 = require("../../../entities/Stocks");
let StockService = class StockService {
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async findAllStock() {
        return await this.stockRepository.find({ order: { stockId: 'desc' } });
    }
    async stockCart() {
        return await this.stockRepository.query('select * from purchasing.getALLStockCart()');
    }
    async findStockId(id) {
        return await this.stockRepository.find({ where: { stockId: id } });
    }
    async findStockName(stockName) {
        return await this.stockRepository.find({ where: { stockName: (0, typeorm_2.Like)('%' + stockName + '%') } });
    }
    async addNewStock(stock) {
        await this.stockRepository.save({
            stockName: stock.stockName,
            stockDescription: stock.stockDescription,
            stockQuantity: stock.stockQuantity,
            stockReorderPoint: stock.stockReorderPoint,
            stockUsed: stock.stockUsed,
            stockScrap: stock.stockScrap,
            stockSize: stock.stockSize,
            stockColor: stock.stockColor,
            stockModifiedDate: new Date()
        });
        const res = await this.findAllStock();
        return ({ message: `Congrats, you have new Stock`, result: res });
    }
    async editStock(id, stock) {
        return await this.stockRepository.update({
            stockId: id
        }, {
            stockName: stock.stockName,
            stockDescription: stock.stockDescription,
            stockQuantity: stock.stockQuantity,
            stockReorderPoint: stock.stockReorderPoint,
            stockUsed: stock.stockUsed,
            stockScrap: stock.stockScrap,
            stockSize: stock.stockSize,
            stockColor: stock.stockColor,
            stockModifiedDate: new Date()
        });
    }
    async dropStock(id) {
        await this.stockRepository.delete({ stockId: id });
        return `Congrats, you're Stock has been deleted`;
    }
};
StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Stocks_1.Stocks)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map