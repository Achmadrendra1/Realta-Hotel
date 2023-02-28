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
import { ServiceTask } from 'src/entities/ServiceTask';
@Controller('service')
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

  @Post('insert')
  async createService(@Body() data: ServiceTask) {
    const service = await this.ServiceTaskService.createService(data);
    if (!service) {
      return 'failed insert to service';
    } else {
      return ' success insert to service';
    }
  }

  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.ServiceTaskService.updateServiceTask(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params): Promise<any> {
    return this.ServiceTaskService.deleteServiceTask(params.id);
  }
}
