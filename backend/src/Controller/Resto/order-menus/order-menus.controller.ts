import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderMenusService } from 'src/Service/Resto/order-menus/order-menus.service';

@Controller('order-menus')
export class OrderMenusController {
    constructor(private readonly orderMenusService:OrderMenusService){}

    @Get()
    getOrderMenus(){
        return this.orderMenusService.getOrderMenus();
    }

    @Post(":id")
    editOrderMenus(@Body() body, @Param() param){
        return this.orderMenusService.editOrderMenu(param, body);
    }
}
