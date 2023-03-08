import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department';
import { Employee } from 'src/entities/Employee';
import { EmployeeDepartmentHistory } from 'src/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'src/entities/EmployeePayHistory';
import { JobRole } from 'src/entities/JobRole';
import { Users } from 'src/entities/Users';
import { IsNull, Like, Repository } from 'typeorm';

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
    @InjectRepository(Users)
    private users: Repository<Users>,
    @InjectRepository(JobRole)
    private job: Repository<JobRole>,
  ) {}

  async getEmployee(): Promise<any> {
    return await this.employeeStore.find({
      relations: {
        empUser: true,
      },
    });
  }

  async getDeptHistory(id: number): Promise<any> {
    return await this.departmentHist.find({
      where: { edhiEmpId: id },
      relations: { edhiDept: true },
    });
  }

  async getPayHistory(id: number): Promise<any> {
    return await this.paymentHist.find({
      where: { ephiEmpId: id },
    });
  }

  async employeeDetail(id: number): Promise<any> {
    return await this.employeeStore.query(
      `select * from hr.profileDetail(${id})`,
    );
  }

  async updatePhotos(id: number, file: any): Promise<any> {
    await this.employeeStore
      .createQueryBuilder()
      .update(Employee)
      .set({ empPhoto: file.filename })
      .where({ empId: id })
      .execute();
    return this.employeeStore.find({ where: { empId: id } });
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
          file.filename,
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

      const newEmp = await this.employeeStore.query(
        `select * from users.users join hr.employee on user_id = emp_user_id
        where emp_id = hr.getId() - 1;`,
      );
      const postings = {
        empId: newEmp[0].emp_id,
        empNationalId: newEmp[0].emp_national_id,
        empBirthDate: newEmp[0].emp_birth_date,
        empMaritalStatus: newEmp[0].emp_marital_status,
        empGender: newEmp[0].emp_gender,
        empHireDate: newEmp[0].emp_hire_date,
        empSalariedFlag: newEmp[0].emp_salaried_flag,
        empVacationHours: newEmp[0].emp_vacation_hours,
        empSickleaveHourse: newEmp[0].emp_sickleave_hourse,
        empCurrentFlag: newEmp[0].emp_current_flag,
        empPhoto: newEmp[0].emp_photo,
        empModifiedDate: newEmp[0].emp_modified_date,
        empUser: {
          userId: newEmp[0].user_id,
          userFullName: newEmp[0].user_full_name,
          userType: newEmp[0].user_type,
          userCompanyName: newEmp[0].user_company_name,
          userEmail: newEmp[0].user_email,
          userPhoneNumber: newEmp[0].user_phone_number,
          userModifiedDate: newEmp[0].user_modified_date,
        },
      };
      return postings;
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteEmployee(id: number): Promise<any> {
    await this.users.delete({ userId: id });
    return {
      id: id,
      message: 'Delete Success',
    };
  }

  async updateEmployee(data: any, jobs: any): Promise<any> {
    const similar = jobs.split(' ');
    const dept = await this.department.findOne({
      where: { deptName: Like(`%${similar[0]}%`) },
    });
    await this.employeeStore.query(
      `call hr.updateEmp($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        data.userId,
        data.empId,
        data.fullName,
        data.nationalId,
        data.birthDate,
        data.hireDate,
        data.marital,
        data.gender,
        data.salaryFlag,
        data.status,
        data.vacation,
        data.sick,
        data.jobId,
        data.salary,
        data.frequenltyPay,
        dept.deptId,
      ],
    );

    return {
      id: +data.empId,
      nationalid: data.nationalId,
      birthdate: data.birthDate,
      fullname: data.fullName,
      hire: data.hireDate,
      status: data.status,
    };
  }

  async addMutations(data: any): Promise<any> {
    const datas = {
      edhiId: null,
      edhiEmpId: data.empId,
      edhiStartDate: new Date(),
      edhiEndDate: null,
      edhiShift: data.shiftId,
      edhiDept: data.deptId,
      edhiModifiedDate: new Date(),
    };
    await this.departmentHist
      .createQueryBuilder()
      .update()
      .set({
        edhiEndDate: new Date(),
      })
      .where({ edhiEndDate: IsNull() })
      .execute();

    const newDeptHist = await this.departmentHist.save(datas);

    const departments = await this.department.findOne({
      where: { deptId: data.deptId },
    });

    const deptNames = departments.deptName.split(' ');
    const jobRoles = await this.job.findOne({
      where: { joroName: Like(`%${deptNames[0]}%`) },
    });

    await this.employeeStore
      .createQueryBuilder()
      .update(Employee)
      .set({
        empJoro: { joroId: +jobRoles.joroId },
        empModifiedDate: new Date(),
      })
      .where({ empId: data.empId })
      .execute();

    return await this.departmentHist.findOne({
      where: { edhiId: newDeptHist.edhiId },
      relations: { edhiDept: true },
    });
  }

  async addPay(data: any): Promise<any> {
    const datas = {
      ephiEmpId: data.empId,
      ephiRateChangeDate: new Date(),
      ephiRateSalary: data.salary,
      ephiPayFrequence: data.payFrequence,
      ephiModifiedDate: new Date(),
    };
    return this.paymentHist.save(datas);
  }
}
