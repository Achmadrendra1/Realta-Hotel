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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entitys = void 0;
const typeorm_1 = require("typeorm");
const Bank_1 = require("./Bank");
const PaymentGateway_1 = require("./PaymentGateway");
const UserAccounts_1 = require("./UserAccounts");
let Entitys = class Entitys {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "entity_id" }),
    __metadata("design:type", Number)
], Entitys.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Bank_1.Bank, (bank) => bank.bankEntity),
    __metadata("design:type", Bank_1.Bank)
], Entitys.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PaymentGateway_1.PaymentGateway, (paymentGateway) => paymentGateway.pagaEntity),
    __metadata("design:type", PaymentGateway_1.PaymentGateway)
], Entitys.prototype, "paymentGateway", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAccounts_1.UserAccounts, (userAccounts) => userAccounts.usacEntity),
    __metadata("design:type", Array)
], Entitys.prototype, "userAccounts", void 0);
Entitys = __decorate([
    (0, typeorm_1.Index)("entitys_pkey", ["entityId"], { unique: true }),
    (0, typeorm_1.Entity)("entitys", { schema: "payment" })
], Entitys);
exports.Entitys = Entitys;
//# sourceMappingURL=Entitys.js.map