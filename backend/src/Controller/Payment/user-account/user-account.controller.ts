import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserAccountService } from 'src/Service/Payment/user-account/user-account.service';

@Controller('user-account')
export class UserAccountController {
    constructor(private accountService : UserAccountService){}

    @Get()
    getAllData(){
        return this.accountService.getAll()
    }

    @Get('/paga')
    getPaga(){
        return this.accountService.getPayment()
    }

    @Get('/join')
    getJoin(){
        return this.accountService.getDataWithJoin()
    }

    @Get('one')
    getByAccNumber(@Body() body){
        return this.accountService.getByAccNumber(body.usacAccountNumber)
    }

    @Post()
    createAcc(@Body() body){
        return this.accountService.createAccount(body)
    }

    @Put()
    updateAcc(@Body() body){
        return this.accountService.updateAccount(body.usacAccountNumber, body)
    }

    @Delete()
    deleteAcc(@Body() body){
        return this.accountService.deleteAccount(body.usacAccountNumber)
    }
}
