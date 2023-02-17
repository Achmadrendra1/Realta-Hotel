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
    @Post('create')
    create(@Body() body: any): Promise<any> {
      return this.CountryService.createCountry(body);
    }
  
    //update
    @Put(':id')
    update(@Param() params, @Body() body: any): Promise<any> {
      return this.CountryService.updateCountry(params.id, body);
    }
  
    //delete
    @Delete(':id')
    remove(@Param() params): Promise<any> {
      return this.CountryService.deleteCountry(params.id);
    }
}
