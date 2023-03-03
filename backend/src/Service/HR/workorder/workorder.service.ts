import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTask } from 'src/entities/ServiceTask';
import { WorkOrderDetail } from 'src/entities/WorkOrderDetail';
import { WorkOrders } from 'src/entities/WorkOrders';
import { Repository } from 'typeorm';

@Injectable()
export class WorkorderService {
  constructor(
    @InjectRepository(WorkOrders)
    private workorder: Repository<WorkOrders>,
    @InjectRepository(WorkOrderDetail)
    private workorderdetail: Repository<WorkOrderDetail>,
    @InjectRepository(ServiceTask)
    private service: Repository<ServiceTask>,
  ) {}

  async getWorkOrders(): Promise<any> {
    return await this.workorder.find({ relations: { woroUser: true } });
  }

  async getDeatils(id: number): Promise<any> {
    // return await this.workorderdetail.find({
    //   where: { wodeWoro: { woroUser: { userId: id } } },
    //   relations: { wodeEmp: true, wodeWoro: { woroUser: true } },
    // });
  }

  async getService(): Promise<any> {
    // const data = await this.service.find();
    // const employeeName = await this.workorderdetail.find({
    //   relations: { wodeEmp: true, wodeWoro: { woroUser: true } },
    // });
    // const newData = [];
    // const employeData = [];
    // employeeName.map((item: any) => {
    //   employeData.push({
    //     label: item.wodeWoro.woroUser.userFullName,
    //     value: item.wodeEmp.empId,
    //   });
    // });
    // data.map((item: any) => {
    //   newData.push({
    //     value: item.setaName,
    //   });
    // });
    // return {
    //   task: newData,
    //   employeeName: employeData,
    // };
  }
}
