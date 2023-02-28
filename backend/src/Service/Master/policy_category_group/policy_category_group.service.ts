// import { Injectable } from '@nestjs/common';
// //
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// //
// import { PolicyCategoryGroup } from 'src/entities/PolicyCategoryGroup';
// @Injectable()
// export class PolicyCategoryGroupService {
//   constructor(
//     @InjectRepository(PolicyCategoryGroup)
//     private policyCategoryGroupRepository: Repository<PolicyCategoryGroup>,
//   ) {}

//   //find All
//   async findAllPolicyCategoryGroup(): Promise<any> {
//     return await this.policyCategoryGroupRepository.find();
//   }

//   //find by Id
//   async findOnePolicyCategoryGroup(pocaPoliId: number): Promise<any> {
//     return await this.policyCategoryGroupRepository.findOne({
//       where: {
//         pocaPoliId: pocaPoliId,
//       },
//     });
//   }

//   //find PolicyCategoryGroup Group by Cagro
//   async getPolicyCategoryGroupByName(pocaCagro: any): Promise<any> {
//     return await this.policyCategoryGroupRepository.find({
//       where: {
//         pocaCagro: pocaCagro,
//       },
//     });
//   }
//   //find PolicyCategoryGroup Group by policy
//   async getPolicyCategoryGroupByCategory(
//     name: string,
//   ): Promise<PolicyCategoryGroup[]> {
//     return await this.policyCategoryGroupRepository
//       .createQueryBuilder('policyCategoryGroup')
//       .leftJoinAndSelect('policyCategoryGroup.pocaPoli', 'policy')
//       .where('policy.poliName LIKE :name', { name: `%${name}%` })
//       .getMany();
//   }
//   //create new
//   async createPolicyCategoryGroup(data: PolicyCategoryGroup): Promise<any> {
//     return await this.policyCategoryGroupRepository
//       .save(data)
//       .then(() => {
//         return 'success';
//       })
//       .catch((error) => {
//         return error;
//       });
//   }

//   //update
//   async updatePolicyCategoryGroup(
//     pocaPoliId: number,
//     data: PolicyCategoryGroup,
//   ): Promise<any> {
//     return await this.policyCategoryGroupRepository
//       .update({ pocaPoliId: pocaPoliId }, data)
//       .then(() => {
//         return 'success';
//       })
//       .catch((error) => {
//         return error;
//       });
//   }

//   //delete
//   async deletePolicyCategoryGroup(pocaPoliId: number): Promise<any> {
//     return await this.policyCategoryGroupRepository
//       .delete({ pocaPoliId: pocaPoliId })
//       .then(() => {
//         return 'success';
//       })
//       .catch((error) => {
//         return error;
//       });
//   }
// }
