import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingOrderDetailExtraService } from 'src/Service/Booking/booking-order-detail-extra/booking-order-detail-extra.service';

@Controller('booking-order-detail-extra')
export class BookingOrderDetailExtraController {
    constructor(private readonly BookingOrderDetailExtraService : BookingOrderDetailExtraService){} 

    @Get('all')
    findAllBookingOrderDetailExtra(){
        return this.BookingOrderDetailExtraService.findAll()
    }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.BookingOrderDetailExtraService.findAllId(params.id)
    }

    @Post('create')
    createBookingOrderDetailExtra(@Body() body){
        return this.BookingOrderDetailExtraService.createBookingOrderDetailExtra(body)
    }

    @Put('edit/:id')
    updateBookingOrderDetailExtra(@Param() params, @Body() body){
        return this.BookingOrderDetailExtraService.updateBookingOrderDetailExtra(params.id, body)
    }

    @Delete('delete/:boexId')
    deleteBookingOrderDetailExtra(@Param() params){
        return this.BookingOrderDetailExtraService.deleteBookingOrderDetailExtra(params.boexId)
    }
}
