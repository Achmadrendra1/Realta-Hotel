import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return await this.membersRepository.find();
      }
    
      //find by Id
      async findOneMembers(membName: any): Promise<any> {
        return await this.membersRepository.findOne({
          where: {
            membName: membName,
          },
        });
      }
    
      //create new
      async createMembers(data: Members): Promise<any> {
        return await this.membersRepository
          .save(data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
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
