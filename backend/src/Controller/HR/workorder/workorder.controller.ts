import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkorderService } from '../../../Service/HR/workorder/workorder.service';

@Controller('workorder')
export class WorkorderController {
  constructor(private workorder: WorkorderService) {}

  @Get('')
  workOrders(): Promise<any> {
    return this.workorder.getWorkOrders();
  }

  @Get('/task')
  serviceTask(): Promise<any> {
    return this.workorder.getService();
  }

  @Get('/:id')
  workOrderDetail(@Param('id') id): Promise<any> {
    return this.workorder.getDeatils(id);
  }

  @Post('')
  addWorkOrder(@Body() body): Promise<any> {
    return this.workorder.addWorkOrder(body);
  }

  @Post('/details')
  addWorkDetail(@Body() body): Promise<any> {
    return this.workorder.addWorkDetail(body);
  }

  @Put('')
  updateDetails(@Body() body): Promise<any> {
    return this.workorder.updateWorkDetail(body);
  }

  @Delete('/del/:id')
  deleteWorkDetail(@Param('id') param): Promise<any> {
    return this.workorder.deleteDetail(param);
  }
}
