import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { BookingOrdersService } from 'src/Service/Booking/booking_orders/booking_orders.service';

@Controller('booking-orders')
export class BookingOrdersController {
    constructor(private readonly BookingOrdersService : BookingOrdersService){}

    @Get('all')
    findAllBookingOrders(){
        return this.BookingOrdersService.findAll()
    }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.BookingOrdersService.findById(params.id)
    }

    @Get('hotel')
    findSpHotel
    
    @Get('last')
    findLastBooking(){
        return this.BookingOrdersService.findLastBooking()
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
