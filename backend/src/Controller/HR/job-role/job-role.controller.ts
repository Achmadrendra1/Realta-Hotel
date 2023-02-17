import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { JobRoleService } from 'src/Service/HR/job-role/job-role.service';

@Controller('job-role')
export class JobRoleController {
  constructor(public jobRoleService: JobRoleService) {}

  @Get('')
  findAllRoles(): Promise<any> {
    return this.jobRoleService.getAllJob();
  }

  @Get('/:name')
  findByName(@Param('name') param): Promise<any> {
    return this.jobRoleService.findAJob(param);
  }
}
