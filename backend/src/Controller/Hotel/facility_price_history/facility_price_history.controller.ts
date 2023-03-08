import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacilityPriceHistoryService } from 'src/Service/Hotel/facility_price_history/facility_price_history.service';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(private FaphService: FacilityPriceHistoryService) {}

  @Get()
  getFaph() {
    return this.FaphService.findAllFaph();
  }
  @Get(':id')
  getFaphId(@Param('id') id) {
    return this.FaphService.findByFaphId(id);
  }
  @Put(':id')
  UpdateFaph(@Param('if') id: any, @Body() body: any) {
    return this.FaphService.UpdateFaph(id, body);
  }
  @Post()
  addFaph(@Body() body: any) {
    return this.FaphService.addNewFaph(body);
  }
  @Delete(':id')
  DeleteHore(@Param('id') id) {
    return this.FaphService.deleteFaph(id);
  }
}
