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

  async getAll() {
    return await this.payRepository.find();
  }

  async getHistoryTransaction() {
    return await this.payRepository.query(
      'select * from payment.getTransactionList()',
    );
  }

  async getById(id: number) {
    return await this.payRepository.findOneBy({
      patrId: id,
    });
  }

  async createData(items: any) {
    await this.payRepository.query(
      'call payment.insertPaymentTrx($1, $2, $3, $4, $5)',
      [items.userId, items.amount, items.sourceNumber, items.targetNumber, items.trxType],
    );
    const res = await this.usacService.getByAccNumber(items.targetNumber)
    return res
    // const lastCode = await this.getLastCode()
    // const code = this.generateCode(lastCode[0].patrTrxId, 'BO#20230410-0013')
    // const type = code[0].split('#')
    // this.payRepository.createQueryBuilder()
    // console.log(code[0], type[0])
    // return "Cek Log"
    // return await this.payRepository.save(
    //   {
    //     patrTrxId : code[0],
    //     patrDebet : items.patrDebet,
    //     patrCredit : items.patrCredit,
    //     patrType : type[0]
    //     patrNote : items.patrNote,
    //     patrModifiedDate : new Date(),
    //     patrOrderNumber : items.patrOrderNumber,
    //     patrSourceId : items.patrSourceId,
    //     patrTargetId : items.patrTargetId,
    //     patrTrxNumberRef : items.patrTrxNumberRef,
    //     patrUserId : items.patrUserId
    //   }
    // )
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
          patrUser : items.patrUser
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
