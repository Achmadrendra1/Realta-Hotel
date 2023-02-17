import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionsService } from 'src/Service/Master/regions/regions.service';
@Controller('regions')
export class RegionsController {
  constructor(private RegionsService: RegionsService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.RegionsService.findAllRegions();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.RegionsService.findOneRegions(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.RegionsService.createRegions(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.RegionsService.updateRegions(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.RegionsService.deleteRegions(params.id);
  }
}
