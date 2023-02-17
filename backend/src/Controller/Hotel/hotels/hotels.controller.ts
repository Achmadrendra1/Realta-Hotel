import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { HotelsService } from 'src/Service/Hotel/hotels/hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Get()
  getHotels() {
    return this.hotelsService.findAllHotels();
  }
  @Get(':id')
  getHotelsId(@Param('id') id: number) {
    return this.hotelsService.findByNameId(id);
  }
  @Put(':id')
  UpdateHotel(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.hotelsService.UpdateHotel(hotelId, body);
  }
  @Post('Add')
  addHotel(@Body() body: any) {
    return this.hotelsService.addNewHotel(body);
  }
  @Delete()
  DeleteHotel(@Param('id') params) {
    return this.hotelsService.deleteHotels(params);
  }
}
