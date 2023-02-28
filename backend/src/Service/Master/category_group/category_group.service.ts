import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'src/entities/CategoryGroup';
import { Like, Repository } from 'typeorm';
import { fileName } from 'typeorm-model-generator/dist/src/NamingStrategy';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroup)
    private categoryGroupRepository: Repository<CategoryGroup>,
  ) {}

  //find All
  async findAllCategoryGroup(): Promise<any> {
    return await this.categoryGroupRepository.find({
      order: {
        cagroId: 'ASC',
      },
    });
  }

  //find by Id
  async findOneCategoryGroup(cagroId: number): Promise<any> {
    return await this.categoryGroupRepository.findOne({
      where: {
        cagroId: cagroId,
      },
    });
  }
  //find Category Group by Name
  async getCategoryGroupByName(name: string): Promise<any> {
    return await this.categoryGroupRepository.find({
      where: {
        cagroName: Like(`%${name}%`),
      },
    });
  }
  //find Category Group by Policy
  async getCategoryGroupByPolicy(name: string): Promise<any> {
    return await this.categoryGroupRepository
      .createQueryBuilder('category_group')
      .innerJoin(
        'policy_category_group',
        'policy_category_group',
        'policy_category_group.poca_cagro_id = category_group.cagro_id',
      )
      .innerJoin(
        'policy',
        'policy',
        'policy.poli_id = policy_category_group.poca_poli_id',
      )
      .where('policy.poli_name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
  //find Category Group by Facility
  async getCategoryGroupByFacility(name: string): Promise<any> {
    return await this.categoryGroupRepository.find({
      where: {
        facilities: {
          faciName: Like(`%${name}%`),
        },
      },
    });
  }

  //create new

  async createCategoryGroup(data: CategoryGroup): Promise<any> {
    return await this.categoryGroupRepository.save(
      this.categoryGroupRepository.create(data),
    );
  }

  // upload photo
  async storeFileInfo(file: { filename: any; originalName: any }, body: any) {
    const fileInfo = new CategoryGroup();

    fileInfo.cagroIconUrl = `http://localhost:3500/category/public/asset/master/${file.filename}`;
    fileInfo.cagroIcon = file.filename; //.svg .jpg
    fileInfo.cagroName = body.cagro_name;
    fileInfo.cagroDescription = body.cagro_description;
    fileInfo.cagroType = body.cagro_type;

    await this.categoryGroupRepository.save(fileInfo);

    const res = await this.categoryGroupRepository.query(
      'select * from master.category_group',
    );

    return { result: res };
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
