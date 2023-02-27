import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Policy } from 'src/entities/Policy';

@Injectable()
export class PolicyService {
    constructor(
        @InjectRepository(Policy)
        private policyRepository: Repository<Policy>,
      ) {}
    
      //find All
      async findAllPolicy(): Promise<any> {
        return await this.policyRepository.find();
      }
    
      //find by Id
      async findOnePolicy(poliId: number): Promise<any> {
        return await this.policyRepository.findOne({
          where: {
            poliId: poliId,
          },
        });
      }
    
      //create new
      async createPolicy(data: Policy): Promise<any> {
        return await this.policyRepository
          .save(data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //update
      async updatePolicy(poliId: number, data: Policy): Promise<any> {
        return await this.policyRepository
          .update({ poliId: poliId }, data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //delete
      async deletePolicy(poliId: number): Promise<any> {
        return await this.policyRepository
          .delete({ poliId: poliId })
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
}

