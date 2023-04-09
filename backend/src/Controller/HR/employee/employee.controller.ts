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
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { EmployeeService } from '../../../Service/HR/employee/employee.service';
import { JobRoleService } from '../../../Service/HR/job-role/job-role.service';

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

  @Get('public/:filename')
  getPhoto(@Param('filename') file: string, @Res() res) {
    return res.sendFile(file, { root: join('public/employeephoto') });
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/employeephoto',
        filename(req, file, callback) {
          const filenames = file.originalname.split('.');
          callback(
            null,
            filenames[0] + Date.now() + '.' + filenames[filenames.length - 1],
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

  @Put('empfoto')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/employeephoto',
        filename(req, file, callback) {
          const filenames = file.originalname.split('.');
          callback(
            null,
            filenames[0] + Date.now() + '.' + filenames[filenames.length - 1],
          );
        },
      }),
    }),
  )
  async updatePhotoEmp(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ): Promise<any> {
    await this.employeeService.updatePhotos(body.id, file);
    return this.employeeService.employeeDetail(body.id);
  }

  @Post('/mutation/')
  mutationsEmployee(@Body() body): Promise<any> {
    return this.employeeService.addMutations(body);
  }

  @Post('/payhist')
  payHistory(@Body() body): Promise<any> {
    return this.employeeService.addPay(body);
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
