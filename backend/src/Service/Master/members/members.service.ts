import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
//
import { Members } from 'src/entities/Members';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private membersRepository: Repository<Members>,
  ) {}

  //find All
  async findAllMembers(): Promise<any> {
    return await this.membersRepository.find({
      order: {
        membName: 'ASC',
      },
    });
  }

  //find by one name
  async findOneMembers(membName: any): Promise<any> {
    return await this.membersRepository.findOne({
      where: {
        membName: membName,
      },
    });
  }

  //find by user
  async getMemberByuser(name: any): Promise<any> {
    return await this.membersRepository.find({
      where: {},
    });
  }

  //find member item by Name
  async getMemberByName(name: string): Promise<any> {
    return await this.membersRepository.find({
      where: {
        membName: Like(`%${name}%`),
      },
    });
  }

  async createMembers(data: Members): Promise<Members> {
    return await this.membersRepository.save(
      this.membersRepository.create(data),
    );
  }

  //update
  async updateMembers(membName: any, data: Members): Promise<any> {
    return await this.membersRepository
      .update({ membName: membName }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteMembers(membName: any): Promise<any> {
    return await this.membersRepository
      .delete({ membName: membName })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
