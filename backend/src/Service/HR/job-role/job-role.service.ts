import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRole } from 'src/entities/JobRole';
import { Like, Repository } from 'typeorm';

@Injectable()
export class JobRoleService {
  constructor(
    @InjectRepository(JobRole)
    public jobRoles: Repository<JobRole>,
  ) {}

  async findAJob(id: number): Promise<any> {
    return await this.jobRoles.findOne({
      where: {
        joroId: id,
      },
    });
  }

  async getAllJob(): Promise<any> {
    return await this.jobRoles.find();
  }

  async getJobSelection(): Promise<any> {
    const datas = await this.jobRoles.find();
    const items = [];
    datas.map((item: any) => {
      items.push({
        value: item.joroId,
        label: item.joroName,
      });
    });
    return items;
  }
}
