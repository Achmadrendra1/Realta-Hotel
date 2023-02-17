import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from 'src/entities/UserProfiles';
import { Repository } from 'typeorm';
import * as DataEnum from 'src/DataEnum';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfiles)
    private readonly userProfilesRepository: Repository<UserProfiles>,
  ) {}

  async create(item: UserProfiles) {
    const hasil = await this.userProfilesRepository.save({
      usproId: item.usproId,
      usproNationalId: item.usproNationalId,
      usproBirtDate: item.usproBirtDate,
      usproJobTitle: item.usproJobTitle,
      usproMartialStatus: DataEnum.MaritalStatus[item.usproMartialStatus],
      usproGender: DataEnum.Gender[item.usproGender],
      usproAddr: item.usproAddr,
      usproUser: item.usproUser,
    });
    return {
      message: 'Data Berhasil dibuat',
      result: hasil,
    };
  }

  async findAll() {
    return await this.userProfilesRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} userProfile`;
  // }

  async update(id: number, item: UserProfiles) {
    return await this.userProfilesRepository.update(
      { usproId: id },
      {
        usproNationalId: item.usproNationalId,
        usproBirtDate: item.usproBirtDate,
        usproJobTitle: item.usproJobTitle,
        usproMartialStatus: DataEnum.MaritalStatus[item.usproMartialStatus],
        usproGender: DataEnum.Gender[item.usproGender],
        usproAddr: item.usproAddr,
        usproUser: item.usproUser,
      },
    );
  }

  async remove(id: number) {
    return await this.userProfilesRepository.delete({ usproId: id });
  }
}
