import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentGatewayService } from 'src/Service/Payment/payment-gateway/payment-gateway.service';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private payService: PaymentGatewayService) {}

  @Get()
  getAllBank() {
    return this.payService.getAll();
  }

  @Get(':id')
  getBankId(@Param() params) {
    return this.payService.getbyId(params.id);
  }

  @Post()
  createNewBank(@Body() body) {
    return this.payService.createPaga(body);
  }

  @Put(':id')
  updateBank(@Param() params, @Body() body) {
    return this.payService.updatePaga(params.id, body);
  }

  @Delete(':id')
  deleteBank(@Param() params) {
    return this.payService.deletePaga(params.id);
  }
}
