import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { EmployeeDepartmentHistory } from 'src/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'src/entities/EmployeePayHistory';
import { Like, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeStore: Repository<Employee>,
    @InjectRepository(EmployeeDepartmentHistory)
    private departmentHist: Repository<EmployeeDepartmentHistory>,
    @InjectRepository(EmployeePayHistory)
    private paymentHist: Repository<EmployeePayHistory>,
  ) {}

  async getEmployee(): Promise<any> {
    return await this.employeeStore.query(`select * from hr.empProfile()`);
  }

  async getDeptHistory(id: number): Promise<any> {
    return await this.departmentHist.find({
      where: { edhiEmpId: id },
      relations: {
        edhiDept: true,
      },
    });
  }

  async getPayHistory(id: number): Promise<any> {
    return await this.paymentHist.find({
      where: { ephiEmp: { empId: id } },
    });
  }

  async employeeDetail(id: number): Promise<any> {
    return await this.employeeStore.query(
      `select * from hr.profileDetail(${id})`,
    );
  }
}
