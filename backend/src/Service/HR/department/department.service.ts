import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptStore: Repository<Department>,
  ) {}

  async getDept(): Promise<any> {
    return await this.deptStore.find();
  }

  async updateDept(id: number, data: any): Promise<any> {
    const date = new Date();
    await this.deptStore
      .createQueryBuilder()
      .update(Department)
      .set({ deptName: data?.name, deptModifiedDate: date })
      .where({ deptId: id })
      .execute();
    return {
      deptId: id,
      deptName: data.name,
      deptModifiedDate: date,
    };
  }

  async addDept(data: object): Promise<any> {
    return await this.deptStore.save(data);
  }

  async delDept(id: number): Promise<any> {
    await this.deptStore.delete({ deptId: id });
    return {
      deptId: id,
      status: 'Success',
    };
  }

  async getSelect(): Promise<any> {
    const data = await this.deptStore.find();
    const items = [];
    data.map((item: any) => {
      items.push({
        value: item.deptId,
        label: item.deptName,
      });
    });
    return items;
  }
}
