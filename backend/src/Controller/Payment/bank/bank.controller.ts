import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BankService } from 'src/Service/Payment/bank/bank.service';

@Controller('bank')
export class BankController {
    constructor(private bankService : BankService){}

    @Get('all')
    getAllBank(){
        return this.bankService.getAll()
    }

    @Get()
    paginateGetAll(@Query() query){
        return this.bankService.getPagination(query)
    }
    
    @Get(':id')
    getBankId(@Param() params){
        return this.bankService.getbyId(params.id)
    }

    @Post()
    createNewBank(@Body() body){
        return this.bankService.createBank(body)
    }

    @Put(':id')
    updateBank(@Param() params, @Body() body){
        return this.bankService.updateBank(params.id, body)
    }

    @Delete(':id')
    deleteBank(@Param() params){
        return this.bankService.deleteBank(params.id)
    }

}
