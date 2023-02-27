import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'src/entities/CategoryGroup';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroup)
    private categoryGroupRepository: Repository<CategoryGroup>,
  ) {}

  //find All
  async findAllCategoryGroup(): Promise<any> {
    return await this.categoryGroupRepository.find();
  }

  //find by Id
  async findOneCategoryGroup(cagroId: number): Promise<any> {
    return await this.categoryGroupRepository.findOne({
      where: {
        cagroId: cagroId,
      },
    });
  }

  //create new
  async createCategoryGroup(data: CategoryGroup): Promise<any> {
    return await this.categoryGroupRepository
      .save(data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //update
  async updateCategoryGroup(
    cagroId: number,
    data: CategoryGroup,
  ): Promise<any> {
    return await this.categoryGroupRepository
      .update({ cagroId: cagroId }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteCategoryGroup(cagroId: number): Promise<any> {
    return await this.categoryGroupRepository
      .delete({ cagroId: cagroId })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
