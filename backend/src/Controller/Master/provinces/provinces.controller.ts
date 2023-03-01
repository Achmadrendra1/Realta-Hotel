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
import { Proviences } from 'src/entities/Proviences';
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
  // @Post('insert')
  // create(@Body() body: any): Promise<any> {
  //   return this.ProvincesService.createProviences(body);
  // }
  @Post('insert')
  async createProviences(@Body() data: Proviences) {
    const regions = await this.ProvincesService.createProviences(data);
    if (!regions) {
      return 'failed insert to regions';
    } else {
      return ' success insert to regions';
    }
  }
  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.ProvincesService.updateProviences(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params) {
    const result = this.ProvincesService.deleteProviences(params.id);
    if (result) {
      return `data hasbeen deleted`;
    } else {
      return `gagal`;
    }
  }
}
