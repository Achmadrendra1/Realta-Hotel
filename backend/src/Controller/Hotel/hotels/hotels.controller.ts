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
  Query,
} from '@nestjs/common';
import { HotelsService } from 'src/Service/Hotel/hotels/hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Get()
  getHotels(@Query() query) {
    return this.hotelsService.findAllHotels(query);
  }
  @Get(':id')
  getHotelsId(@Param('id') id: number) {
    return this.hotelsService.findByNameId(id);
  }

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
