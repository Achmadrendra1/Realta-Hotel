import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceTaskService } from 'src/Service/Master/service_task/service_task.service';
@Controller('service-task')
export class ServiceTaskController {
  constructor(private ServiceTaskService: ServiceTaskService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.ServiceTaskService.findAllServiceTask();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.ServiceTaskService.findOneServiceTask(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.ServiceTaskService.createServiceTask(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.ServiceTaskService.updateServiceTask(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.ServiceTaskService.deleteServiceTask(params.id);
  }
}
