import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'src/entities/CategoryGroup';
import { Like, Repository } from 'typeorm';

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

  //create new

  async createCategoryGroup(data: CategoryGroup): Promise<any> {
    return await this.categoryGroupRepository.save(
      this.categoryGroupRepository.create(data),
    );
  }

  // // upload photo by D
  async storeFileInfo(file: { filename: any; originalName: any }, body: any) {
    const fileInfo = new CategoryGroup();

    console.log(file)
    fileInfo.cagroIconUrl = `http://localhost:3600/category/public/upload/${file.filename}`;
    fileInfo.cagroIcon = file.filename; //.svg .jpg
    fileInfo.cagroName = body.cagroName;
    fileInfo.cagroDescription = body.cagroDescription;
    fileInfo.cagroType = body.cagroType;

    await this.categoryGroupRepository.save(fileInfo);

    const res = await this.categoryGroupRepository.query(
      'select * from master.category_group order by cagro_id',
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
