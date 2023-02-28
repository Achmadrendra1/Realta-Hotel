import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBonusPoints } from 'src/entities/UserBonusPoints';
import { Repository } from 'typeorm';
import * as DataEnum from 'src/DataEnum';

@Injectable()
export class UserBonusPointsService {
  constructor(
    @InjectRepository(UserBonusPoints)
    private userBonusPointsRepository: Repository<UserBonusPoints>,
  ) {}

  async create(items: UserBonusPoints): Promise<any> {
    const hasil = await this.userBonusPointsRepository.save({
      ubpoId: items.ubpoId,
      ubpoUser: items.ubpoUser,
      ubpoTotalPoints: items.ubpoTotalPoints,
      ubpoBonusType: DataEnum.BonusType[items.ubpoBonusType],
      ubpoCreatedOn: new Date(),
    });

    return {
      message: 'Data Berhasil dibuat',
      result: hasil,
    };
  }

  async findAll() {
    return await this.userBonusPointsRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} userBonusPoint`;
  // }

  async update(id: number, items: UserBonusPoints) {
    return await this.userBonusPointsRepository
      .update(
        { ubpoId: id },
        {
          ubpoUser: items.ubpoUser,
          ubpoTotalPoints: items.ubpoTotalPoints,
          ubpoBonusType: DataEnum.BonusType[items.ubpoBonusType],
          ubpoCreatedOn: new Date(),
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
  }

  async remove(id: number) {
    const result = await this.userBonusPointsRepository.delete({ ubpoId: id });
    if (result.affected > 0) {
      throw new HttpException(
        {
          message: 'Data User Bonus Point Berhasil Dihapus',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: 'Data User Bonus Point Tidak Ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
