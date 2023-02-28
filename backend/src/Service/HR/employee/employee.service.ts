import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department';
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
    @InjectRepository(Department)
    private department: Repository<Department>,
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

  async updatePhotos(data: any): Promise<any> {
    await this.employeeStore
      .createQueryBuilder()
      .update(Employee)
      .set({ empPhoto: data.photo })
      .where({ empId: data.id })
      .execute();
    return this.employeeStore.find({ where: { empId: data.id } });
  }

  async addEmployee(data: any, file: any, jobs: any): Promise<any> {
    const similar = jobs.split(' ');
    const date = new Date();
    const dept = await this.department.findOne({
      where: { deptName: Like(`%${similar[0]}%`) },
    });
    const empBos = await this.employeeStore.findOne({
      where: { empJoro: true, empEmp: { empId: 1 } },
    });
    try {
      await this.employeeStore.query(
        `call hr.addEmployee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          data.fullName,
          file.path,
          data.nationalId,
          data.birthDate,
          date,
          data.marital,
          data.gender,
          data.salaryFlag,
          +data.status,
          0,
          0,
          +data.jobId,
          +data.salary,
          data.frequenltyPay,
          +dept.deptId,
          date,
          1,
          !empBos ? 1 : empBos.empId,
        ],
      );

      return {
        message: 'Employee added',
      };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
