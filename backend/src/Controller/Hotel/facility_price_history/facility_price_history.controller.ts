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
  getHore() {
    return this.FaphService.findAllFaph();
  }
  @Get(':id')
  getHoreId(@Param() params) {
    return this.FaphService.findByFaphId(params);
  }
  @Put(':id')
  UpdateHore(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.FaphService.UpdateFaph(hotelId, body);
  }
  @Post('Add')
  addHore(@Body() body: any) {
    return this.FaphService.addNewFaph(body);
  }
  @Delete()
  DeleteHore(@Param('id') params) {
    return this.FaphService.deleteFaph(params);
  }
}
