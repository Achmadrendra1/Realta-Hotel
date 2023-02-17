import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/entities/Bank';
import { Repository } from 'typeorm';
import { EntitysService } from '../entitys/entitys.service';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    private entityService: EntitysService,
  ) {}

  async getAll() {
    return await this.bankRepository.find({
      order: {
        bankEntityId: "ASC"
      }
    });
  }

  async getbyId(id: number) {
    return await this.bankRepository.find({
      where: {
        bankEntityId: id,
      },
    });
  }

  async getByCode(bankCode: string) {
    return await this.bankRepository.findOneBy({
      bankCode: bankCode,
    });
  }

  async getByName(bankName: string) {
    return await this.bankRepository.findOneBy({
      bankName: bankName,
    });
  }

  async createBank(items: Bank) {
    try {
      await this.bankRepository.query('call payment.InsertBank($1, $2)', [items.bankCode, items.bankName])
      const res = await this.getAll()
      return {
        message: 'Data Bank Successfully Created',
        result : res
      }
    } catch (error) {
      throw new HttpException(
        {message : 'Bank Code Or Bank Name Already Exist'},
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async updateBank(id: number, items: Bank) {
    const res = await this.getbyId(id)
    const all = await this.getAll()
    if (res[0]) {
      try {
        await this.bankRepository
      .update(
        {
          bankEntityId: id,
        },
        {
          bankEntityId: items.bankEntityId,
          bankCode: items.bankCode,
          bankName: items.bankName,
          bankModifiedDate: new Date(),
        },
      )
    return {
      message: 'Data Bank Successfully Updated',
      
    };
      } catch (error) {
        throw new HttpException(
          {
            message: 'Bank Code Or Bank Name Already Exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      
    } else {
      throw new HttpException(
        {
          message: 'Data Bank Does Not Exist',
        },
        HttpStatus.BAD_REQUEST,
      );
      }
  }

  async deleteBank(id: number) {
      await this.bankRepository.delete({bankEntityId: id}),
      await this.entityService.deleteEntity(id)

      return 'Data Bank Deleted'
  

    // //Cek status delete
    // if (result[0].affected > 0 && result[1].affected > 0) {
    //   throw new HttpException(
    //     {
    //       message: 'Data Bank Successfully Deleted',
    //     },
    //     HttpStatus.OK,
    //   );
    // } else {
    //   throw new HttpException(
    //     {
    //       message: 'Data Bank Already Exist',
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }
}
