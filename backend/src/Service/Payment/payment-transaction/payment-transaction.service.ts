import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTransaction } from 'src/entities/PaymentTransaction';
import { Repository } from 'typeorm';
import * as myEnum from "../../../DataEnum"


@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private payRepository: Repository<PaymentTransaction>,
  ) {}

  async getAll() {
    return await this.payRepository.find();
  }

  async getHistoryTransaction() {
    return await this.payRepository.query('select * from payment.getTransactionList()');
  }

  async getById(id: number) {
    return await this.payRepository.findOneBy({
      patrId: id,
    });
  }

  async getLastCode(){
    return await this.payRepository.find({
      order : {patrTrxId : "DESC"},
      take : 1
    })
  }

   generateCode(maxCountingCode:string, ...transType: string[]) {
    //Ambil Tanggal Sekarang  
    const date = new Date();
    //Ubah Format Tanggal ke YYYYMMDD
    const currentDate =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
    //Deklarasi Counting
    let count = 0;
    //Split Kode Jadi 2 array [TRB] [YYYYMMDD-0000]
    let delHashtag = maxCountingCode.split("#");
    //Split Kode Jadi 2 array [YYYYMMDD] [0000]
    let delDash = delHashtag[1].split("-");

    let delHashtagUniCod = transType[0].split("#")
    
    //Ambil last date dari last code yang diinput
    let lastDate = delDash[0]
    //Ambil last counting dari last code yang diinput
    let lastCount = parseInt(delDash[1])
  
    //Cek tanggal sekarang dengan last date, Kalau tidak sama countnya di reset dari 1
    if (currentDate != lastDate) {
      count = 1;
    } else {
      //kalau sama countnya di lanjut dari last count yang diinput
      count = lastCount
      count++
    }
    //Set count tadi ke string dan tambahkan 0 didepan nya (Maks 4 digit)
    let newCounting = count.toString().padStart(4, "0");
    //Set code baru

    if(delHashtagUniCod[0] == "MENUS"){
      let newCode = `ORM#${currentDate}-${newCounting}`
      return [newCode]
    } else if(delHashtagUniCod[0] == "BO"){
      let newCode = `TRB#${currentDate}-${newCounting}`
      return [newCode]
    } else if(transType[0] == "Top Up") {
      let newCode = `TP#${currentDate}-${newCounting}`
      return [newCode]
    } else if(transType[0] == "Re payment"){
      let newCode = `RPY#${currentDate}-${newCounting}`
      return [newCode]
    } else if (transType[0] == "Re fund") {
      let newCode = `RF#${currentDate}-${newCounting}`
      return [newCode]
    }

  }

  async createData(items : PaymentTransaction) {
      const lastCode = await this.getLastCode()
      const code = this.generateCode(lastCode[0].patrTrxId, 'BO#20230410-0013')
      const type = code[0].split('#')
      this.payRepository.createQueryBuilder()
      console.log(code[0], type[0])
      return "Cek Log"
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

  async updateData(id : number, items : PaymentTransaction){
    await this.payRepository.update(
      {
        patrId : id
      },
        {
          patrTrxId : items.patrTrxId,
          patrDebet : items.patrDebet,
          patrCredit : items.patrCredit,
          patrType : myEnum.TransactionType[items.patrType],
          patrNote : items.patrNote,
          patrModifiedDate : items.patrModifiedDate,
          patrOrderNumber : items.patrOrderNumber,
          patrSourceId : items.patrSourceId,
          patrTargetId : items.patrTargetId,
          patrTrxNumberRef : items.patrTrxNumberRef,
          // patrUserId : items.patrUserId
        }
      ).catch((err) => {
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
