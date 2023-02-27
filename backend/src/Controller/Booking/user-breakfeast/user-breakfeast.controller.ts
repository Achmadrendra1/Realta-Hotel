import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserBreakfeastService } from 'src/Service/Booking/user-breakfeast/user-breakfeast.service';

@Controller('user-breakfeast')
export class UserBreakfeastController {
    constructor (private readonly UserBreakfeastService : UserBreakfeastService){}

    @Get('all')
    findAllUserBreakfeast(){
        return this.UserBreakfeastService.findAll()
    }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.UserBreakfeastService.findAllId(params.id)
    }
    
    @Post('create')
    createUserBreakfeast(@Body() body){
        return this.UserBreakfeastService.createUserBreakfeast(body)
    }

    @Put('edit/:id')
    updateUserBreakfeast(@Param() params, @Body() body){
        return this.UserBreakfeastService.updateUserBreakfeast(params.id, body)
    }

    @Delete('delete/:usbrBordeId')
    deleteUserBreakfeast(@Param() params){
        return this.UserBreakfeastService.deleteUserBreakfeast(params.usbrBordeId)

    }
}
