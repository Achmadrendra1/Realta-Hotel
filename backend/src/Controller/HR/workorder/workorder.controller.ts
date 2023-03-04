import { Controller, Get, Param } from '@nestjs/common';
import { WorkorderService } from 'src/Service/HR/workorder/workorder.service';

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
}
