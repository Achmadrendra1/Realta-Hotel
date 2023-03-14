import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    return await this.policyRepository.find({
      order: {
        poliId: 'ASC',
      },
    });
  }

  //find by Id
  async findOnePolicy(poliId: number): Promise<any> {
    return await this.policyRepository.findOne({
      where: {
        poliId: poliId,
      },
    });
  }

  //find Policy Group by Name
  async getPolicyByName(name: string): Promise<any> {
    return await this.policyRepository.find({
      where: {
        poliName: Like(`%${name}%`),
      },
    });
  }
  //find Policy Group by Category
  async getPolicyByCategory(name: string): Promise<any> {
    return await this.policyRepository
      .createQueryBuilder('policy')
      .innerJoinAndSelect('policy.policyCategoryGroup', 'policyCategoryGroup')
      .innerJoinAndSelect('policyCategoryGroup.pocaCagro', 'categoryGroup')
      .where('categoryGroup.cagroName ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  //create new
  async createPolicy(data: Policy): Promise<Policy> {
    return await this.policyRepository.save(data);
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
