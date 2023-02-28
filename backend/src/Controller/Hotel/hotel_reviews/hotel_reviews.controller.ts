import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HotelReviewsService } from 'src/Service/Hotel/hotel_reviews/hotel_reviews.service';

@Controller('hotel-reviews')
export class HotelReviewsController {
  constructor(private horeService: HotelReviewsService) {}

  @Get()
  getHore() {
    return this.horeService.findAllHotelsReviews();
  }
  @Get(':id')
  getHoreId(@Param() params) {
    return this.horeService.findReviewById(params);
  }
  @Put(':id')
  UpdateHore(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.horeService.UpdateHotelReviews(hotelId, body);
  }
  @Post('Add')
  addHore(@Body() body: any) {
    return this.horeService.addNewHotelReviews(body);
  }
  @Delete()
  DeleteHore(@Param('id') params) {
    return this.horeService.deleteHotelsReviews(params);
  }
}
