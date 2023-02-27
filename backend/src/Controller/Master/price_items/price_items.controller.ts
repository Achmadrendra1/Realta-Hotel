import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PriceItemsService } from 'src/Service/Master/price_items/price_items.service';
@Controller('price-items')
export class PriceItemsController {
  constructor(private PriceItemsService: PriceItemsService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.PriceItemsService.findAllPriceItems();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.PriceItemsService.findOnePriceItems(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.PriceItemsService.createPriceItems(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.PriceItemsService.updatePriceItems(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.PriceItemsService.deletePriceItems(params.id);
  }
}
