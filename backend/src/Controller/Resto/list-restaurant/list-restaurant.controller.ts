import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListRestaurantService } from 'src/Service/Resto/list-restaurant/list-restaurant.service';

@Controller('list-restaurant')
export class ListRestaurantController {
    constructor(private readonly listResto: ListRestaurantService){}
 
    @Get(':page')
    getListResto(@Param() param){
        return this.listResto.getListResto(param)
    }
}
