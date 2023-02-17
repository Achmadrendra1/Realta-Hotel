import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacilityPhotosService } from 'src/Service/Hotel/facility_photos/facility_photos.service';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private FaphoService: FacilityPhotosService) {}

  @Get()
  getHore() {
    return this.FaphoService.findAllFapho();
  }
  @Get(':id')
  getHoreId(@Param() params) {
    return this.FaphoService.findByFaphoId(params);
  }
  @Put(':id')
  UpdateHore(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.FaphoService.UpdateFapho(hotelId, body);
  }
  @Post('Add')
  addHore(@Body() body: any) {
    return this.FaphoService.addNewFapho(body);
  }
  @Delete()
  DeleteHore(@Param('id') params) {
    return this.FaphoService.deleteFapho(params);
  }
}
