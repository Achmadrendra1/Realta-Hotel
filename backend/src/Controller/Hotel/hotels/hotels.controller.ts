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
  // @Get(':hotelName')
  // getHotelName(@Param('hotelName') hotelName: string) {
  //   return this.hotelsService.findByHotelName(hotelName);
  // }

  @Put(':id')
  UpdateHotel(@Param('id') id: any, @Body() body: any) {
    return this.hotelsService.UpdateHotel(id, body);
  }
  @Post('Add')
  addHotel(@Body() body: any) {
    return this.hotelsService.addNewHotel(body);
  }
  @Delete(':id')
  DeleteHotel(@Param('id') id: any) {
    return this.hotelsService.deleteHotels(id);
  }
}
