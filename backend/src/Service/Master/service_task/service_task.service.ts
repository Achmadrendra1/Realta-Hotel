import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
//

import { ServiceTask } from 'src/entities/ServiceTask';
@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectRepository(ServiceTask)
    private serviceTaskRepository: Repository<ServiceTask>,
  ) {}

  //find All
  async findAllServiceTask(): Promise<any> {
    return await this.serviceTaskRepository.find({
      order: {
        setaId: 'ASC',
      },
    });
  }

  //find by Id
  async findOneServiceTask(setaId: number): Promise<any> {
    return await this.serviceTaskRepository.findOne({
      where: {
        setaId: setaId,
      },
    });
  }

  //find service item job Role
  async getServiceByJobRole(name: string): Promise<any> {
    return await this.serviceTaskRepository.find({
      where: {},
    });
  }

  //create new

  async createService(data: ServiceTask): Promise<ServiceTask> {
    return await this.serviceTaskRepository.save(
      this.serviceTaskRepository.create(data),
    );
  }
  //update
  async updateServiceTask(setaId: number, data: ServiceTask): Promise<any> {
    return await this.serviceTaskRepository
      .update({ setaId: setaId }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteServiceTask(setaId: number): Promise<any> {
    return await this.serviceTaskRepository
      .delete({ setaId: setaId })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
