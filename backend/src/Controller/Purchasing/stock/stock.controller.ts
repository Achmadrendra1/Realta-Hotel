import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StockService } from 'src/service/Purchasing/stock/stock.service';

@Controller('stock')
export class StockController {
  constructor(
    private stockService: StockService
  ) { }

  @Get()
  getStocks() {
    return this.stockService.findAllStock()
  }
  
  @Get('cart')
  getStockCart() {
    return this.stockService.stockCart()
  }

  @Get(':id')
  getStockId(@Param() params: any) {
    return this.stockService.findStockName(params.id)
  }

  @Get(':name')
  getStockName(@Param() params: any) {
    return this.stockService.findStockName(params.name)
  }

  @Post()
  createStock(@Body() body: any) {
    return this.stockService.addNewStock(body)
  }

  @Put(':id')
  updateStock(@Param() params: any, @Body() body: any) {
    return this.stockService.editStock(params.id, body)
  }

  @Delete(':id')
  deleteStock(@Param() params: any) {
    return this.stockService.dropStock(params.id)
  }
}
