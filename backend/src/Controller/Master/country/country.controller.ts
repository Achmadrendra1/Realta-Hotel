import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CountryService } from 'src/Service/Master/country/country.service';
import { Country } from 'src/entities/Country';
@Controller('country')
export class CountryController {
  constructor(private CountryService: CountryService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.CountryService.findAllCountry();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.CountryService.findOneCountry(id);
  }

  //create new
  @Post('insert')
  async create(@Body() data: Country) {
    const country = await this.CountryService.createCountry(data);
    if (!country) {
      return ' failed insert to country';
    } else {
      return ' success insert to country';
    }
  }

  //update
  @Put('edit/:id')
  async update(@Param() params, @Body() body: any): Promise<any> {
    return this.CountryService.updateCountry(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params) {
    const result = this.CountryService.deleteCountry(params.id);
    if (result) {
      return `data hasbeen deleted`;
    } else {
      return `gagal`;
    }
  }
}
