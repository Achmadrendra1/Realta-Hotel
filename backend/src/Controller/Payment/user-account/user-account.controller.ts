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

    @Post('one')
    getByAccNumber(@Body() body){
        return this.accountService.getByAccNumber(body.usacAccountNumber)
    }

    @Post()
    createAcc(@Body() body){
        return this.accountService.createAccount(body)
    }

    @Post('/check')
    checkSecure(@Body() body){
        return this.accountService.checkSecureCode(body)
    }

    @Put()
    updateAcc(@Body() body){
        return this.accountService.updateAccount(body.usacAccountNumber, body)
    }

    @Delete(':accNumber')
    deleteAcc(@Param() params){
        return this.accountService.deleteAccount(params.accNumber)
    }
}
