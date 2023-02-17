import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.serviceTaskRepository.find();
  }

  //find by Id
  async findOneServiceTask(setaId: number): Promise<any> {
    return await this.serviceTaskRepository.findOne({
      where: {
        setaId: setaId,
      },
    });
  }

  //create new
  async createServiceTask(data: ServiceTask): Promise<any> {
    return await this.serviceTaskRepository
      .save(data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
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
