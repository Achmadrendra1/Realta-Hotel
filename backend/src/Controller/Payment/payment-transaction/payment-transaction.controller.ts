import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentTransactionService } from 'src/Service/Payment/payment-transaction/payment-transaction.service';

@Controller('payment-transaction')
export class PaymentTransactionController {
    constructor(private payService : PaymentTransactionService){}
    @Get()
    getAll(){
        return this.payService.getAll()
    }

    @Get('last')
    getLastCode(){
        return this.payService.getLastCode()
    }

    @Post()
    createPayment(@Body() body){
        return this.payService.createData(body)
    }

    @Get('history')
    getHistoryTrx(){
        return this.payService.getHistoryTransaction()
    }

}
