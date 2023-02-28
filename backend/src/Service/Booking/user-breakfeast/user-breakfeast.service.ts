import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBreakfeast } from 'src/entities/UserBreakfeast';
import { Repository } from 'typeorm';

@Injectable()
export class UserBreakfeastService {
  constructor(
    @InjectRepository(UserBreakfeast)
    private userBreakfeastRepository: Repository<UserBreakfeast>,
  ) {}

  async findAll(): Promise<any> {
    return await this.userBreakfeastRepository.find();
  }

  async findAllId(id: number): Promise<any> {
    return await this.userBreakfeastRepository.find({
      where: {
        usbrBordeId: id,
      },
    });
  }

  async createUserBreakfeast(field: UserBreakfeast): Promise<any> {
    return await this.userBreakfeastRepository
      .save({
        usbrBordeId: field.usbrBordeId,
        usbrModifiedDate: field.usbrModifiedDate,
        usbrTotalVacant: field.usbrTotalVacant,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil menambahkan User Breakfeast`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async updateUserBreakfeast(id: number, field: UserBreakfeast): Promise<any> {
    return await this.userBreakfeastRepository
      .update(
        {
          usbrBordeId: id,
        },
        {
          usbrBordeId: field.usbrBordeId,
          usbrModifiedDate: field.usbrModifiedDate,
          usbrTotalVacant: field.usbrTotalVacant,
        },
      )
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil masukan UserBreakfeast`,
          return: result,
        };
      })
      .catch((err) => {
        return `Maaf, ada kesalahan masukan` + err;
      });
  }

  async deleteUserBreakfeast(id: number) {
    return await this.userBreakfeastRepository
      .delete({
        usbrBordeId: id,
      })
      .then((result) => {
        return {
          messeage: `Selamat anda berhasil hapus data`,
          return: result,
        };
      });
  }
}
