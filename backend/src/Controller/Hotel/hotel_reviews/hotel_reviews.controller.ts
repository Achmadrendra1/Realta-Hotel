import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HotelReviewsService } from '../../../Service/Hotel/hotel_reviews/hotel_reviews.service';

@Controller('hotel-reviews')
export class HotelReviewsController {
  constructor(private horeService: HotelReviewsService) {}

  @Get()
  getHore() {
    return this.horeService.findAllHotelsReviews();
  }
  @Get(':id')
  getHoreId(@Param('id') id) {
    return this.horeService.findReviewById(id);
  }
  @Put(':id')
  UpdateHore(@Param('id') id: any, @Body() body: any) {
    return this.horeService.UpdateHotelReviews(id, body);
  }
  @Post('Add')
  addHore(@Body() body: any) {
    return this.horeService.addNewHotelReviews(body);
  }
  @Delete(':id')
  DeleteHore(@Param('id') id) {
    return this.horeService.deleteHotelsReviews(id);
  }
}
