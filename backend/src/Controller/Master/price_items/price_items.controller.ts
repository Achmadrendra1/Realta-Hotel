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
import { PriceItems } from 'src/entities/PriceItems';
@Controller('price')
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

  //find by Name
  @Get('/name/:name')
  priceName(@Param('name') params): Promise<any> {
    return this.PriceItemsService.getPriceByName(params);
  }

  //find by Hotel
  @Get('/hotel/:name')
  pricehotel(@Param('name') params): Promise<any> {
    return this.PriceItemsService.getPriceItemByHotelName(params);
  }

  //create new

  @Post('insert')
  async createPriceItems(@Body() data: PriceItems) {
    const PriceItems = await this.PriceItemsService.createPriceItems(data);
    if (!PriceItems) {
      return 'failed insert to regions';
    } else {
      return ' success insert to regions';
    }
  }

  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.PriceItemsService.updatePriceItems(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params): Promise<any> {
    return this.PriceItemsService.deletePriceItems(params.id);
  }
}
