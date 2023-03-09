import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
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
    @InjectRepository(Employee)
    private employee: Repository<Employee>,
  ) {}

  async getWorkOrders(): Promise<any> {
    return await this.workorder.find({ relations: { woroUser: true } });
  }

  async getDeatils(id: number): Promise<any> {
    return await this.workorderdetail.find({
      where: { wodeWoro: { woroId: id } },
      relations: { wodeEmp: { empUser: true } },
    });
  }

  async getService(): Promise<any> {
    const data = await this.service.find();
    const employeeName = await this.employee.find({
      relations: { empUser: true },
    });
    const newData = [];
    const employeData = [];
    employeeName.map((item: any) => {
      employeData.push({
        label: item.empUser.userFullName,
        value: item.empId,
      });
    });
    data.map((item: any) => {
      newData.push({
        value: item.setaId,
        label: item.setaName,
      });
    });
    return {
      task: newData,
      employeeName: employeData,
    };
  }

  async addWorkOrder(datas: any): Promise<any> {
    const newDatas = {
      woroUser: datas.userId,
      woroStartDate: datas.startDate,
      woroStatus: datas.status,
    };
    const newAdd = await this.workorder.save(newDatas);
    return await this.workorder.findOne({
      where: { woroId: newAdd.woroId },
      relations: { woroUser: true },
    });
  }

  async addWorkDetail(datas: any): Promise<any> {
    const newDatas = {
      wodeWoro: datas.woroId,
      wodeEmpId: datas.empId,
      wodeTaskName: datas.task,
      wodeStatus: 'INPROGRESS',
      wodeNotes: datas.notes,
      wodeSeta: datas.setaId,
      wodeStartDate: new Date(),
    };

    return await this.workorderdetail.save(newDatas);
  }

  async deleteDetail(id: any): Promise<any> {
    await this.workorderdetail.delete({ wodeId: id });
    return {
      id: id,
      message: 'Success',
    };
  }

  async updateWorkDetail(datas: any): Promise<any> {
    await this.workorderdetail
      .createQueryBuilder()
      .update(WorkOrderDetail)
      .set({
        wodeEmpId: datas.empId,
        wodeTaskName: datas.task,
        wodeNotes: datas.notes,
        wodeSeta: datas.seta,
      })
      .where({ wodeId: parseInt(datas.wodeId) })
      .execute();
    return await this.workorderdetail.findOne({
      where: { wodeId: datas.wodeId },
      relations: { wodeEmp: { empUser: true } },
    });
  }
}
