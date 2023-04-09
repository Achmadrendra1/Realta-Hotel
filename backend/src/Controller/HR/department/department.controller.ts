import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from 'src/Service/HR/department/department.service';

@Controller('dept')
export class DepartmentController {
  constructor(private deptStore: DepartmentService) {}

  @Get('')
  allDepartment(): Promise<any> {
    return this.deptStore.getDept();
  }

  @Put(':id')
  updateDepartment(@Param('id') param, @Body() body): Promise<any> {
    return this.deptStore.updateDept(param, body);
  }

  @Post('')
  createDepartment(@Body() body): Promise<any> {
    const date = new Date();
    const datas = {
      deptId: null,
      deptName: body.name,
      deptModifiedDate: date,
    };

    return this.deptStore.addDept(datas);
  }

  @Delete(':id')
  deleletDepartment(@Param('id') param): Promise<any> {
    return this.deptStore.delDept(param);
  }

  @Get('/select')
  selectInput(): Promise<any> {
    return this.deptStore.getSelect();
  }
}
