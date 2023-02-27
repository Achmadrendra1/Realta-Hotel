import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestoMenusService } from 'src/Service/Resto/resto-menus/resto-menus.service';

@Controller('resto-menus')
export class RestoMenusController {
    constructor(private restoMenuService: RestoMenusService){}

    @Get()
    getMenus(){
        return this.restoMenuService.getMenus();
    }

    @Post()
    addMenus(@Body() body){
        return this.restoMenuService.addMenus(body);
    }

    @Put(':id')
    editMenu(@Param() Param:number, @Body() Body){
        return this.restoMenuService.editMenu(Param, Body);
    }

    @Delete(':id')
    deleteMenu(@Param() param:number){
        return this.restoMenuService.deleteMenu(param);
    }
}
