import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StockService } from '../../../service/Purchasing/stock/stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  getStocks() {
    return this.stockService.findAllStock();
  }

  @Get(':stockName')
  getStockName(@Param() stockName: any) {
    return this.stockService.findStockName(stockName);
  }

  @Post()
  createStock(@Body() stock: any) {
    return this.stockService.addNewStock(stock);
  }

  @Put(':stockName')
  updateStock(@Body() stock: any) {
    return this.stockService.editStock(stock);
  }

  @Delete(':stockName')
  deleteStock(@Param() stockName: any) {
    return this.stockService.dropStock(stockName);
  }
}
