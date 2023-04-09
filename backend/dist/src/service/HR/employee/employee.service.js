"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Department_1 = require("../../../entities/Department");
const Employee_1 = require("../../../entities/Employee");
const EmployeeDepartmentHistory_1 = require("../../../entities/EmployeeDepartmentHistory");
const EmployeePayHistory_1 = require("../../../entities/EmployeePayHistory");
const JobRole_1 = require("../../../entities/JobRole");
const Users_1 = require("../../../entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeStore, departmentHist, paymentHist, department, users, job) {
        this.employeeStore = employeeStore;
        this.departmentHist = departmentHist;
        this.paymentHist = paymentHist;
        this.department = department;
        this.users = users;
        this.job = job;
    }
    async getEmployee() {
        return await this.employeeStore.find({
            relations: {
                empUser: true,
            },
        });
    }
    async getDeptHistory(id) {
        return await this.departmentHist.find({
            where: { edhiEmpId: id },
            relations: { edhiDept: true },
        });
    }
    async getPayHistory(id) {
        return await this.paymentHist.find({
            where: { ephiEmpId: id },
        });
    }
    async employeeDetail(id) {
        return await this.employeeStore.query(`select * from hr.profileDetail(${id})`);
    }
    async updatePhotos(id, file) {
        await this.employeeStore
            .createQueryBuilder()
            .update(Employee_1.Employee)
            .set({ empPhoto: file.filename })
            .where({ empId: id })
            .execute();
        return this.employeeStore.find({ where: { empId: id } });
    }
    async addEmployee(data, file, jobs) {
        const similar = jobs.split(' ');
        const date = new Date();
        const dept = await this.department.findOne({
            where: { deptName: (0, typeorm_2.Like)(`%${similar[0]}%`) },
        });
        const empBos = await this.employeeStore.findOne({
            where: { empJoro: true, empEmp: { empId: 1 } },
        });
        try {
            await this.employeeStore.query(`call hr.addEmployee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, [
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
            ]);
            const newEmp = await this.employeeStore.query(`select * from users.users join hr.employee on user_id = emp_user_id
        where emp_id = hr.getId() - 1;`);
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
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteEmployee(id) {
        await this.users.delete({ userId: id });
        return {
            id: id,
            message: 'Delete Success',
        };
    }
    async updateEmployee(data, jobs) {
        const similar = jobs.split(' ');
        const dept = await this.department.findOne({
            where: { deptName: (0, typeorm_2.Like)(`%${similar[0]}%`) },
        });
        await this.employeeStore.query(`call hr.updateEmp($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, [
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
        ]);
        return {
            id: +data.empId,
            nationalid: data.nationalId,
            birthdate: data.birthDate,
            fullname: data.fullName,
            hire: data.hireDate,
            status: data.status,
        };
    }
    async addMutations(data) {
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
            .where({ edhiEndDate: (0, typeorm_2.IsNull)() })
            .execute();
        const newDeptHist = await this.departmentHist.save(datas);
        const departments = await this.department.findOne({
            where: { deptId: data.deptId },
        });
        const deptNames = departments.deptName.split(' ');
        const jobRoles = await this.job.findOne({
            where: { joroName: (0, typeorm_2.Like)(`%${deptNames[0]}%`) },
        });
        await this.employeeStore
            .createQueryBuilder()
            .update(Employee_1.Employee)
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
    async addPay(data) {
        const datas = {
            ephiEmpId: data.empId,
            ephiRateChangeDate: new Date(),
            ephiRateSalary: data.salary,
            ephiPayFrequence: data.payFrequence,
            ephiModifiedDate: new Date(),
        };
        return this.paymentHist.save(datas);
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Employee_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(EmployeeDepartmentHistory_1.EmployeeDepartmentHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(EmployeePayHistory_1.EmployeePayHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(Department_1.Department)),
    __param(4, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(5, (0, typeorm_1.InjectRepository)(JobRole_1.JobRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map