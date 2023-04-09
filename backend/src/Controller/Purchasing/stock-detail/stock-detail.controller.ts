import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StodService } from '../../../Service/Purchasing/stock-detail/stock-detail.service';

@Controller('stock-detail')
export class StodController {
  constructor(private stodService: StodService) { }

  @Get()
  getStod() {
    return this.stodService.findAllStod()
  }

  @Get(':id')
  getStodId(@Param() params: any) {
    return this.stodService.findStodId(params.id)
  }

  @Post()
  createStod(@Body() body: any) {
    return this.stodService.addNewStod(body)
  }

  @Put(':id')
  updateStod(@Param() params: any, @Body() body: any) {
    return this.stodService.editStod(params.id, body)
  }

  @Delete(':id')
  deleteStod(@Param() params: any) {
    return this.stodService.dropStod(params.id)
  }
}
