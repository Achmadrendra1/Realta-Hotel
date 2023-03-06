import { Body, Controller, Get, Param,Query, Post } from '@nestjs/common';
import { PaymentTransactionService } from 'src/Service/Payment/payment-transaction/payment-transaction.service';

@Controller('payment-transaction')
export class PaymentTransactionController {
    constructor(private payService : PaymentTransactionService){}
    @Get()
    getPagination(@Query() query){
        return this.payService.getPagination(query)
    }

    @Get('all')
    getAll(){
        return this.payService.getAll()
    }

    @Post()
    createPayment(@Body() body){
        return this.payService.createData(body)
    }

    // @Get('history')
    // getHistoryTrx(@Query() query){
    //     return this.payService.getHistoryTransaction(query)
    // }

}
