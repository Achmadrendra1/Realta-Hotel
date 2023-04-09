import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { BookingOrdersService } from '../../../Service/Booking/booking_orders/booking_orders.service';
import { HotelsService } from '../../../Service/Hotel/hotels/hotels.service';

@Controller('booking-orders')
export class BookingOrdersController {
    constructor(private readonly BookingOrdersService : BookingOrdersService,private hotelsService: HotelsService){}

    @Get('all')
    findAllBookingOrders(){
        return this.BookingOrdersService.findAll()
    }

     //Get hotel untuk Booking
    @Get('hotel')
    getSpHotel() {
        return this.BookingOrdersService.findSpHotel();
    }

    // Sp Get Facilities untuk Booking
  @Get('Faci')
  getSpFacility(){
    return this.BookingOrdersService.findSpFacility()
  }

  
  //Get User Review untuk Booking
  @Get('Review')
  getSpReview(){
    return this.BookingOrdersService.findSpReview();
  }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.BookingOrdersService.findById(params.id)
    }
    
    @Get('last')
    findLastBooking(){
        return this.BookingOrdersService.findLastBooking()
    }

    @Get('invoice')
    findInvoice(){
        return this.BookingOrdersService.getInvoice()
    }

    @Post('create/final')
    async createBookingOrdersFinal(@Body() body : any){
        return await this.BookingOrdersService.createBookingOrdersFinal(body)
    }
    
    @Post('create')
    createBookingOrders(@Body() body){
        return this.BookingOrdersService.createBookingOrders(body)
    }

    @Put('edit/:id')
    updateBookingOrders(@Param() params, @Body() body){
        return this.BookingOrdersService.updateBookingOrders(params.id, body)
    }

    @Delete('delete/:id')
    deleteBookingOrders(@Param() params){
        return this.BookingOrdersService.deleteBookingOrders(params.id)
    }
}
