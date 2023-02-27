import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProvincesService } from 'src/Service/Master/provinces/provinces.service';
@Controller('provinces')
export class ProvincesController {
  constructor(private ProvincesService: ProvincesService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.ProvincesService.findAllProviences();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.ProvincesService.findOneProviences(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.ProvincesService.createProviences(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.ProvincesService.updateProviences(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.ProvincesService.deleteProviences(params.id);
  }
}
