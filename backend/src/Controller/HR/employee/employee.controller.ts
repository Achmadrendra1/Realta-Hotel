import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from 'src/Service/HR/employee/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/')
  allEmployee(): Promise<any> {
    return this.employeeService.getEmployee();
  }

  @Get('/:id')
  async detailEmployee(@Param('id') param): Promise<any> {
    const profile = await this.employeeService.employeeDetail(param);
    const deptHist = await this.employeeService.getDeptHistory(param);
    const payHist = await this.employeeService.getPayHistory(param);

    return {
      employees: profile[0],
      deptHist,
      payHist,
    };
  }
}
