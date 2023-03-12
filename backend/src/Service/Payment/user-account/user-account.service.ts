import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccounts } from 'src/entities/UserAccounts';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccounts)
    private uacRepository: Repository<UserAccounts>,
  ) {}
  // x;

  async getAll() {
    return await this.uacRepository.find();
  }

  async getAccount(id) {
    return await this.uacRepository.find({
      where: { usacUserId: id },
    });
  }

  async getDataWithJoin() {
    return this.uacRepository.find({
      relations: {
        usacUser: true,
      },
      select: {
        usacAccountNumber: true,
        usacUser: {
          userId: true,
          userFullName: true,
        },
      },
    });
  }

  async getByAccNumber(accNumber: string) {
    return await this.uacRepository.findOneBy({
      usacAccountNumber: accNumber,
    });
  }

  async createAccount(items: UserAccounts) {
    try {
      const salt = await bcrypt.genSalt(10);
      const code = await bcrypt.hash(items.usacSecureCode, salt);
      await this.uacRepository.save({
        usacEntityId: items.usacEntityId,
        usacUserId: items.usacUserId,
        usacAccountNumber: items.usacAccountNumber,
        usacSaldo: items.usacSaldo,
        usacType: items.usacType,
        usacExpmonth: items.usacExpmonth,
        usacExpyear: items.usacExpyear,
        usacSecureCode: code,
        usacModifiedDate: new Date(),
      });
      const result = await this.getAll();
      return {
        message: 'Data Payment Gateway Berhasil Dibuat',
        result: result,
      };
    } catch (error) {
      throw new HttpException(
        { message: `Card Number Or Bank Is Already Exist` },
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async deleteAccount(accNumber: any) {
    await this.uacRepository.delete({
      usacAccountNumber: accNumber,
    });

    return 'User Account Deleted';
  }

  async updateSecureCode(items: any) {
    const salt = await bcrypt.genSalt()
    const newCode = await bcrypt.hash(items.secureCode, salt)
    return await this.uacRepository.update(
      {
        usacAccountNumber: items.sourceNumber,
      },
      {
        usacSecureCode: newCode,
      },
    ).then(() => 
      {
        return {message : 'Your PIN is Updated !'}
      }
    ).catch((err) => {
      return {error : err}
    });
    
  }

  async checkSecureCode(items: any) {
    const acc = await this.getByAccNumber(items.sourceNumber);
    const check = await bcrypt.compare(items.secureCode, acc.usacSecureCode);
    if (check == true) {
      return {
        status: check,
        message: 'Your PIN is correct! Please Wait',
      };
    } else {
      throw new HttpException(
        {
          status: check,
          message: 'Oops, Your PIN is incorrect! Please check and try again!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
