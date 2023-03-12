import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTransaction } from 'src/entities/PaymentTransaction';
import { Repository } from 'typeorm';
import * as myEnum from '../../../DataEnum';
import { randomBytes } from 'crypto';
import { UserAccountService } from '../user-account/user-account.service';

@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private payRepository: Repository<PaymentTransaction>,
    private usacService: UserAccountService,
  ) {}

  async getAll(query) {
    const startDate = query.startDate || '';
    const endDate = query.endDate || '';
    const keyword = query.keyword || '';

    let data;

    if(startDate && endDate){
      data = await this.payRepository.query(
        `SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($3))
        AND "trxDate" BETWEEN $1 AND $2`,
        [startDate, endDate, `%${keyword}%`]
      );
    } else {
      data = await this.payRepository.query(
        `select * from payment.user_transactions
        WHERE LOWER("transactionType") LIKE LOWER($1)`,
        [`%${keyword}%`]
      );
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
    const totalData = await this.payRepository.query(
      `SELECT * FROM payment.user_transactions`,
    );
    let filterData;
    let data;
    if(startDate && endDate){
      filterData = await this.payRepository.query(
        `SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($1)
        OR LOWER("userFullName") LIKE LOWER($1)
        OR LOWER("debit"::text) LIKE LOWER($1)
        OR LOWER("credit"::text) LIKE LOWER($1))
        AND "trxDate" BETWEEN $2 AND $3
        ORDER BY "transactionId" DESC`,
        [`%${keyword}%`, startDate, endDate],
      );
      data = await this.payRepository.query(
        `SELECT * FROM payment.user_transactions
         WHERE (LOWER("transactionType") LIKE LOWER($1)
         OR LOWER("userFullName") LIKE LOWER($1)
         OR LOWER("debit"::text) LIKE LOWER($1)
         OR LOWER("credit"::text) LIKE LOWER($1))
         AND "trxDate" BETWEEN $2 AND $3
         ORDER BY "trxDate" DESC
         OFFSET $4 LIMIT $5`,
        [`%${keyword}%`, startDate, endDate, skip, take],
      );
    } else {
      filterData = await this.payRepository.query(
        `SELECT * FROM payment.user_transactions
        WHERE (LOWER("transactionType") LIKE LOWER($1)
        OR LOWER("userFullName") LIKE LOWER($1)
        OR LOWER("debit"::text) LIKE LOWER($1)
        OR LOWER("credit"::text) LIKE LOWER($1))
        ORDER BY "trxDate" DESC`,
        [`%${keyword}%`],
      );
      data = await this.payRepository.query(
        `SELECT * FROM payment.user_transactions
         WHERE (LOWER("transactionType") LIKE LOWER($1)
         OR LOWER("userFullName") LIKE LOWER($1)
         OR LOWER("debit"::text) LIKE LOWER($1)
         OR LOWER("credit"::text) LIKE LOWER($1))
         ORDER BY "trxDate" DESC
         OFFSET $2 LIMIT $3`,
        [`%${keyword}%`, skip, take],
      );
    }
    

    const isQueryDefined = query && query.keyword || query.startDate;
    const total = isQueryDefined ? filterData.length : totalData.length;

    return {
      data,
      count: total,
      currentPage: +page,
    };
  }

  // async getHistoryTransaction(query) {
  //   const take = query.take || 10;
  //   const page = query.page || 1;
  //   const skip = (page - 1) * take;
  //   const keyword = query.keyword || '';
  //   const startDate = query.startDate || '';
  //   const endDate = query.endDate || '';
  //   const totalData = await this.payRepository.query(
  //     'select * from payment.payments_order',
  //   );
  //   let filterData;
  //   let data;
  //   if (startDate && endDate) {
  //     filterData = await this.payRepository.query(
  //       `SELECT * FROM payment.payments_order
  //       WHERE trx_date BETWEEN $2 AND $3
  //       AND (LOWER(patr_trx_id) LIKE LOWER($1)
  //       OR LOWER(user_full_name) LIKE LOWER($1)
  //       OR boor_total_amount::text LIKE LOWER($1))
  //       ORDER BY trx_date DESC`,
  //       [`%${keyword}%`, startDate, endDate],
  //     );
  //     data = await this.payRepository.query(
  //       `SELECT * FROM payment.payments_order
  //         WHERE trx_date::date BETWEEN $2 AND $3
  //         AND (LOWER(patr_trx_id) LIKE LOWER($1)
  //         OR LOWER(user_full_name) LIKE LOWER($1)
  //         OR boor_total_amount::text LIKE LOWER($1))
  //         ORDER BY trx_date DESC
  //         OFFSET $4 LIMIT $5`,
  //       [`%${keyword}%`, startDate, endDate, skip, take],
  //     );
  //   } else {
  //     filterData = await this.payRepository.query(
  //       `SELECT * FROM payment.payments_order
  //       WHERE LOWER(patr_trx_id) LIKE LOWER($1)
  //       OR LOWER(user_full_name) LIKE LOWER($1)
  //       OR boor_total_amount::text LIKE LOWER($1)
  //       ORDER BY trx_date DESC`,
  //       [`%${keyword}%`],
  //     );
  //     data = await this.payRepository.query(
  //       `SELECT * FROM payment.payments_order
  //         WHERE LOWER(patr_trx_id) LIKE LOWER($1)
  //         OR LOWER(user_full_name) LIKE LOWER($1)
  //         OR boor_total_amount::text LIKE LOWER($1)
  //         ORDER BY trx_date DESC
  //         OFFSET $2 LIMIT $3`,
  //       [`%${keyword}%`, skip, take],
  //     );
  //   }

  //   const isQueryDefined = (query && query.keyword) || query.startDate;
  //   const total = isQueryDefined ? filterData.length : totalData.length;

  //   return {
  //     data,
  //     count: total,
  //     currentPage: +page,
  //     // nextPage,
  //     // prevPage,
  //     // lastPage,
  //   };
  // }

  async getById(id: number) {
    return await this.payRepository.findOneBy({
      patrId: id,
    });
  }

  async createData(items: any) {
    await this.payRepository.query(
      'call payment.insertPaymentTrx($1, $2, $3, $4, $5, $6, $7)',
      [
        items.userId,
        items.amount,
        items.sourceNumber,
        items.targetNumber,
        items.trxType,
        items.payType,
        items.orderNumber,
      ],
    );
    const res = await this.usacService.getByAccNumber(items.targetNumber);
    return res;
  }

  async updateData(id: number, items: PaymentTransaction) {
    await this.payRepository
      .update(
        {
          patrId: id,
        },
        {
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
        },
      )
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    //Get Data yang diupdate
    const updated = await this.getById(id);
    return {
      message: 'Data Payment Transaction Berhasil di Update',
      result: updated,
    };
  }
}
