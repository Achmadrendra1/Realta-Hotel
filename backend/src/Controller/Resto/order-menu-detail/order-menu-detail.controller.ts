import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderMenuDetailService } from 'src/Service/Resto/order-menu-detail/order-menu-detail.service';

@Controller('order-menu-detail')
export class OrderMenuDetailController {
    constructor(private readonly orderMenuDetailService:OrderMenuDetailService){}

    @Get()
    getAll(){
        return this.orderMenuDetailService.getAll()
    }

    @Post()
    addOrderMenuDetail(@Body() data){
        return this.orderMenuDetailService.addOrderMenuDetail(data);
    }
}
