import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { EntitysService } from 'src/Service/Payment/entitys/entitys.service';


@Controller('entitys')
export class EntitysController {
    constructor(private entityService : EntitysService){}

    @Get()
    getAllData(){
        return this.entityService.getAll()
    }

    @Get('one')
    getOne(){
        return this.entityService.getOne()
    }

    @Post()
    createData(){
        return this.entityService.createEntity()
    }

    @Delete(':id')
    deleteData(@Param() params){
        return this.entityService.deleteEntity(params.id)
    }
}
