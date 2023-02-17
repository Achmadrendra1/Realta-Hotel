import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacilitiesService } from 'src/Service/Hotel/facilities/facilities.service';

@Controller('facilities')
export class FacilitiesController {
  constructor(private FaciService: FacilitiesService) {}

  @Get()
  getHore() {
    return this.FaciService.findAllFaci();
  }
  @Get(':id')
  getHoreId(@Param() params) {
    return this.FaciService.findByFaciId(params);
  }
  @Put(':id')
  UpdateHore(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.FaciService.UpdateFaci(hotelId, body);
  }
  @Post('Add')
  addHore(@Body() body: any) {
    return this.FaciService.addNewFaci(body);
  }
  @Delete()
  DeleteHore(@Param('id') params) {
    return this.FaciService.deleteFaci(params);
  }
}
