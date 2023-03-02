import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListRestaurantService } from 'src/Service/Resto/list-restaurant/list-restaurant.service';

@Controller('list-restaurant')
export class ListRestaurantController {
    constructor(private readonly listResto: ListRestaurantService){}

    @Get()
    getListResto(){
        return this.listResto.getListResto()
    }
}
