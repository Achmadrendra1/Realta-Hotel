import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from 'src/Service/HR/employee/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/all')
  allEmployee(): Promise<any> {
    return this.employeeService.findEmployee();
  }

  @Get('/work-orders')
  allWork(): Promise<any> {
    return this.employeeService.allWorkOrderUser();
  }

  @Get('/work-orders/details')
  allWorkDetails(): Promise<any> {
    return this.employeeService.getWorkOrdersDetail();
  }

  @Get('/job')
  empJobs(): Promise<any> {
    return this.employeeService.empJob();
  }

  @Get('/job/:name')
  jobName(@Param('name') param): Promise<any> {
    return this.employeeService.getJobByName(param);
  }
}
