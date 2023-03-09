import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderMenusService } from 'src/Service/Resto/order-menus/order-menus.service';

@Controller('order-menus')
export class OrderMenusController {
    constructor(private readonly orderMenusService:OrderMenusService){}

    @Get()
    getOrderMenus(){
        return this.orderMenusService.getOrderMenus();
    }

    // @Post(":id")
    // editOrderMenus(@Body() body, @Param() param){
    //     return this.orderMenusService.editOrderMenu(param, body);
    // }
    @Get('/desc')
    getCodeDesc(){
        return this.orderMenusService.getCodeDesc()
    }
 
    @Post('/order')
    getOrderNumber(@Body() data){
        // console.log('data controller', data);
        
        return this.orderMenusService.getOrderNumber(data);
    }

    @Get('/code')
    getCode(){
        return this.orderMenusService.getCode();
    }

    @Post('/add')
    addOrderMenus(@Body() body){
        return this.orderMenusService.addOrderMenus(body)
    } 

    @Delete(':id')
    deleteOrder(@Param() param){
        return this.orderMenusService.deleteOrder(param)
    }
} 
