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

@Controller('landing')
export class LandingController {
  constructor(private LandingService: FacilitiesService) {}

  @Get()
  getLanding(){
    return this.LandingService.landing();
  }
  @Get(':id')
  getLandingId(@Param('id') id: any) {
    return this.LandingService.landingById(id);
  }
}
