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
exports.PaymentTransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const PaymentTransaction_1 = require("../../../entities/PaymentTransaction");
const typeorm_2 = require("typeorm");
const myEnum = require("../../../DataEnum");
const user_account_service_1 = require("../user-account/user-account.service");
let PaymentTransactionService = class PaymentTransactionService {
    constructor(payRepository, usacService) {
        this.payRepository = payRepository;
        this.usacService = usacService;
    }
    async getAll(query) {
        const startDate = query.startDate || '';
        const endDate = query.endDate || '';
        const keyword = query.keyword || '';
        let data;
        if (startDate && endDate) {
            data = await this.payRepository.query(`SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($3))
        AND "trxDate" BETWEEN $1 AND $2`, [startDate, endDate, `%${keyword}%`]);
        }
        else {
            data = await this.payRepository.query(`select * from payment.user_transactions
        WHERE LOWER("transactionType") LIKE LOWER($1)`, [`%${keyword}%`]);
        }
        const total = data.length;
        return {
            data,
            count: total,
        };
    }
    async getPagination(query) {
        const take = query.take || 10;
        const page = query.page || 1;
        const skip = (page - 1) * take;
        const keyword = query.keyword || '';
        const startDate = query.startDate || '';
        const endDate = query.endDate || '';
        const totalData = await this.payRepository.query(`SELECT * FROM payment.user_transactions`);
        let filterData;
        let data;
        if (startDate && endDate) {
            filterData = await this.payRepository.query(`SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($1)
        OR LOWER("userFullName") LIKE LOWER($1)
        OR LOWER("debit"::text) LIKE LOWER($1)
        OR LOWER("credit"::text) LIKE LOWER($1))
        AND "trxDate" BETWEEN $2 AND $3
        ORDER BY "transactionId" DESC`, [`%${keyword}%`, startDate, endDate]);
            data = await this.payRepository.query(`SELECT * FROM payment.user_transactions
         WHERE (LOWER("transactionType") LIKE LOWER($1)
         OR LOWER("userFullName") LIKE LOWER($1)
         OR LOWER("debit"::text) LIKE LOWER($1)
         OR LOWER("credit"::text) LIKE LOWER($1))
         AND "trxDate" BETWEEN $2 AND $3
         ORDER BY "trxDate" DESC
         OFFSET $4 LIMIT $5`, [`%${keyword}%`, startDate, endDate, skip, take]);
        }
        else {
            filterData = await this.payRepository.query(`SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($1)
        OR LOWER("userFullName") LIKE LOWER($1)
        OR LOWER("debit"::text) LIKE LOWER($1)
        OR LOWER("credit"::text) LIKE LOWER($1))
        ORDER BY "trxDate" DESC`, [`%${keyword}%`]);
            data = await this.payRepository.query(`SELECT * FROM payment.user_transactions
         WHERE (LOWER("transactionType") LIKE LOWER($1)
         OR LOWER("userFullName") LIKE LOWER($1)
         OR LOWER("debit"::text) LIKE LOWER($1)
         OR LOWER("credit"::text) LIKE LOWER($1))
         ORDER BY "trxDate" DESC
         OFFSET $2 LIMIT $3`, [`%${keyword}%`, skip, take]);
        }
        const isQueryDefined = query && query.keyword || query.startDate;
        const total = isQueryDefined ? filterData.length : totalData.length;
        return {
            data,
            count: total,
            currentPage: +page,
        };
    }
    async getById(id) {
        return await this.payRepository.findOneBy({
            patrId: id,
        });
    }
    async createData(items) {
        await this.payRepository.query('call payment.insertPaymentTrx($1, $2, $3, $4, $5, $6, $7)', [
            items.userId,
            items.amount,
            items.sourceNumber,
            items.targetNumber,
            items.trxType,
            items.payType,
            items.orderNumber,
        ]);
        const res = await this.usacService.getByAccNumber(items.targetNumber);
        return res;
    }
    async updateData(id, items) {
        await this.payRepository
            .update({
            patrId: id,
        }, {
            patrTrxId: items.patrTrxId,
            patrDebet: items.patrDebet,
            patrCredit: items.patrCredit,
            patrType: myEnum.TransactionType[items.patrType],
            patrNote: items.patrNote,
            patrModifiedDate: items.patrModifiedDate,
            patrOrderNumber: items.patrOrderNumber,
            patrSourceId: items.patrSourceId,
            patrTargetId: items.patrTargetId,
            patrTrxNumberRef: items.patrTrxNumberRef,
            patrUser: items.patrUser,
        })
            .catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
        const updated = await this.getById(id);
        return {
            message: 'Data Payment Transaction Berhasil di Update',
            result: updated,
        };
    }
};
PaymentTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PaymentTransaction_1.PaymentTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_account_service_1.UserAccountService])
], PaymentTransactionService);
exports.PaymentTransactionService = PaymentTransactionService;
//# sourceMappingURL=payment-transaction.service.js.map