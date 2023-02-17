import { Controller, Get, Param, Body, Put, Delete, Post } from '@nestjs/common';
import { BookingOrderDetailService } from 'src/Service/Booking/booking_order_detail/booking_order_detail.service';

@Controller('booking-order-detail')
export class BookingOrderDetailController {
    constructor(private readonly BookingOrderDetailService : BookingOrderDetailService){}

    @Get('all')
    findAllBookingOrderDetail(){
        return this.BookingOrderDetailService.findAll()
    }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.BookingOrderDetailService.findAllId(params.id)
    }

    @Post('create')
    createBookingOrderDetail(@Body() body){
        return this.BookingOrderDetailService.createBookingOrderDetail(body)
    }

    @Put('edit/:id')
    updateBookingOrderDetail(@Param() params, @Body() body){
        return this.BookingOrderDetailService.updateBookingOrderDetail(params.id, body)
    }

    @Delete('delete/:boorId')
    deleteBookingOrderDetail(@Param() params){
        return this.BookingOrderDetailService.deleteBookingOrderDetail(params.boorId)
    }
}
