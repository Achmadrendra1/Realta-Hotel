import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccounts } from 'src/entities/UserAccounts';
import { DataSource, Repository } from 'typeorm';
import * as myEnum from '../../../DataEnum';
import { userInfo } from 'os';
import { Users } from 'src/entities/Users';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccounts)
    private uacRepository: Repository<UserAccounts>,
  ) {}

  async getAll() {
    return await this.uacRepository.find();
  }

  async getPayment() {
    return await this.uacRepository.find({
      where : {usacUserId : 1}
    })
  }

  async getDataWithJoin() {
    return this.uacRepository.find({
      relations : {
        usacUser : true
      },
      select : {
        usacAccountNumber :true,
        usacUser : {
          userId : true,
          userFullName : true
        }
      }
  })
  }

  async getByAccNumber(accNumber: string) {
    return await this.uacRepository.findOneBy({
      usacAccountNumber: accNumber,
    });
  }

  async createAccount(items: UserAccounts) {
    const result = await this.uacRepository
      .save({
        usacEntityId: items.usacEntityId,
        usacUserId: items.usacUserId,
        usacAccountNumber: items.usacAccountNumber,
        usacSaldo: items.usacSaldo,
        usacType: items.usacType,
        usacExpmonth: items.usacExpmonth,
        usacExpyear: items.usacExpyear,
        usacModifiedDate: new Date(),
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return {
      message: 'Data Payment Gateway Berhasil Dibuat',
      result: result,
    };
  }

  async updateAccount(accNumber: string, items: UserAccounts) {
    await this.uacRepository
      .update(
        {
          usacAccountNumber: accNumber,
        },
        {
          usacEntityId: items.usacEntityId,
          usacUserId: items.usacUserId,
          usacAccountNumber: items.usacAccountNumber,
          usacSaldo: items.usacSaldo,
          usacType: items.usacType,
          usacExpmonth: items.usacExpmonth,
          usacExpyear: items.usacExpyear,
          usacModifiedDate: new Date(),
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
    const updated = await this.getByAccNumber(accNumber);
    return {
      message: 'Data User Account Berhasil di Update',
      result: updated,
    };
  }

  async deleteAccount(accNumber: string) {
    const result = await this.uacRepository.delete({
      usacAccountNumber: accNumber,
    });

    //Cek status delete
    if (result.affected > 0) {
      throw new HttpException(
        {
          message: 'Data User Account Berhasil Dihapus',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: 'Data User Account Tidak Ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
