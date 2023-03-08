import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestoMenusService } from 'src/Service/Resto/resto-menus/resto-menus.service';

@Controller('resto-menus')
export class RestoMenusController {
    constructor(private restoMenuService: RestoMenusService){}

    @Get()
    getMenus(){
        return this.restoMenuService.getMenus();
    }

    @Get(':id')
    getMenu(@Param() Param:any){
        return this.restoMenuService.getMenu(Param)
    }

    @Get('/list/:id')
    getMenuByFacility(@Param() Param:any){
        return this.restoMenuService.getMenuByFacility(Param)
    } 

    @Post('menu-dashboard')
    getMenuForAdmin(@Body() body){
        return this.restoMenuService.getMenuForAdmin(body);
    }
    
    @Post('/user/:id')
    getMenuForUser(@Param() Param:any, @Body() body){ 
        
        return this.restoMenuService.getMenuForUser(Param, body)
    } 
    // @Get('/facility')
    // getFacility(){
    //     return this.restoMenuService.getFacility()
    // }
   
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
        // console.log('sampai ke delete di be');
        return this.restoMenuService.deleteMenu(param);
    }
} 
