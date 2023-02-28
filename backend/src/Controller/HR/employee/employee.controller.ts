import {
  Controller,
  Get,
  Param,
  UploadedFile,
  Body,
  Post,
  UseInterceptors,
  Delete,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EmployeeService } from 'src/Service/HR/employee/employee.service';
import { JobRoleService } from 'src/Service/HR/job-role/job-role.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private jobRoleService: JobRoleService,
  ) {}

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

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './employeephoto',
        filename(req, file, callback) {
          const filenames = file.originalname.split('.');
          callback(
            null,
            req.body.fullName + '.' + filenames[filenames.length - 1],
          );
        },
      }),
    }),
  )
  async addEmployees(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ): Promise<any> {
    const job = await this.jobRoleService.findAJob(parseInt(body.jobId));
    return await this.employeeService.addEmployee(body, file, job.joroName);
  }

  @Put('')
  async updateEmployee(@Body() body): Promise<any> {
    const job = await this.jobRoleService.findAJob(parseInt(body.jobId));
    return await this.employeeService.updateEmployee(body, job.joroName);
  }

  @Delete(':id')
  async deleteEmployees(@Param('id') id): Promise<any> {
    return await this.employeeService.deleteEmployee(id);
  }
}
