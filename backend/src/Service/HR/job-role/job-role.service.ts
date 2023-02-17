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

  async findAJob(name: string): Promise<any> {
    return await this.jobRoles.findOne({
      where: {
        joroName: Like(`%${name}%`),
      },
    });
  }

  async getAllJob(): Promise<any> {
    return await this.jobRoles.find();
  }
}
