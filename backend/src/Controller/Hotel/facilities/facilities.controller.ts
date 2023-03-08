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
  getFacility() {
    return this.FaciService.findAllFaci();
  }
  @Get(':id')
  getFacilityId(@Param('id') id: any) {
    return this.FaciService.findByFaciId(id);
  }
  @Put(':id')
  UpdateFacility(@Param('id') id: any, @Body() body: any) {
    return this.FaciService.UpdateFaci(id, body);
  }
  @Post()
  addFacility(@Body() body: any) {
    return this.FaciService.addNewFaci(body);
  }
  @Delete(':id')
  DeleteFacility(@Param('id') id: any) {
    return this.FaciService.deleteFaci(id);
  }
}
