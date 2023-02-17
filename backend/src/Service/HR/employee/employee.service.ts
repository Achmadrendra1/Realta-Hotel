import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { Like, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeStore: Repository<Employee>,
  ) {}

  async findEmployee(): Promise<any> {
    return await this.employeeStore.find();
  }

  async allWorkOrderUser(): Promise<any> {
    return await this.employeeStore.query(`
    select woro_id, user_full_name, woro_start_date, woro_status from users.users u join hr.work_orders wo on u.user_id = wo.woro_user_id
    `);
  }

  async empJob(): Promise<any> {
    return await this.employeeStore.find({
      relations: {
        empJoro: true,
      },
    });
  }

  async getWorkOrdersDetail(): Promise<any> {
    return await this.employeeStore.query(`
    select 
      user_full_name,
      wode_status,
      wode_task_name
      wode_emp_id,
      joro_name
    from 
      users.users u join hr.work_orders wo on u.user_id = wo.woro_user_id
      join hr.work_order_detail wod on wo.woro_id = wod.wode_woro_id
      join hr.employee e on wod.wode_emp_id = e.emp_id
      join hr.job_role jr on e.emp_joro_id = jr.joro_id
  `);
  }

  async getJobByName(name: string): Promise<any> {
    return await this.employeeStore.find({
      where: {
        empJoro: {
          joroName: Like(`%${name}%`),
        },
      },
    });
  }
}
