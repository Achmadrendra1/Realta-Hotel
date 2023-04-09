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
exports.PaymentGateway = void 0;
const typeorm_1 = require("typeorm");
const Entitys_1 = require("./Entitys");
let PaymentGateway = class PaymentGateway {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "paga_entity_id" }),
    __metadata("design:type", Number)
], PaymentGateway.prototype, "pagaEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "paga_code",
        nullable: true,
        unique: true,
        length: 10,
    }),
    __metadata("design:type", String)
], PaymentGateway.prototype, "pagaCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "paga_name",
        nullable: true,
        unique: true,
        length: 55,
    }),
    __metadata("design:type", String)
], PaymentGateway.prototype, "pagaName", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "paga_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], PaymentGateway.prototype, "pagaModifiedDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Entitys_1.Entitys, (entitys) => entitys.paymentGateway, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "paga_entity_id", referencedColumnName: "entityId" }]),
    __metadata("design:type", Entitys_1.Entitys)
], PaymentGateway.prototype, "pagaEntity", void 0);
PaymentGateway = __decorate([
    (0, typeorm_1.Index)("payment_gateway_paga_code_key", ["pagaCode"], { unique: true }),
    (0, typeorm_1.Index)("paga_entity_id_pk", ["pagaEntityId"], { unique: true }),
    (0, typeorm_1.Index)("payment_gateway_paga_name_key", ["pagaName"], { unique: true }),
    (0, typeorm_1.Entity)("payment_gateway", { schema: "payment" })
], PaymentGateway);
exports.PaymentGateway = PaymentGateway;
//# sourceMappingURL=PaymentGateway.js.map