import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { JobRoleService } from '../../../Service/HR/job-role/job-role.service';

@Controller('jobrole')
export class JobRoleController {
  constructor(public jobRoleService: JobRoleService) {}

  @Get('')
  findAllRoles(): Promise<any> {
    return this.jobRoleService.getAllJob();
  }

  @Get('/select')
  getSelectJob(): Promise<any> {
    return this.jobRoleService.getJobSelection();
  }

  @Get('/:name')
  findByName(@Param('name') param): Promise<any> {
    return this.jobRoleService.findAJob(param);
  }
}
