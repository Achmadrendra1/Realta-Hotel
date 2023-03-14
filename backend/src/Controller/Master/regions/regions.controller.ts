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
import { Regions } from 'src/entities/Regions';

interface dataLocations {
  regionCode: any;
  regionName: any;
  countryId: any;
  countryName: any;
  countryRegion: any; // one-to-many { country_region_id -> regionCode }
  provId: any;
  provName: any;
  addresses: any; //one-to-many
  provCountry: any; //many-to-one { prov_country_id -> countryId }
  addrId: any;
  addrLine1: any;
  addrLine2: any;
  addrPostalCode: any;
  addrSpatialLocation: any;
  addrProv: any; // many-to-one { addr_prov_id -> provId }
  hotels: any; // one-to many
  userProfiles: any; //one-to-many
}

@Controller('regions')
export class RegionsController {
  constructor(private RegionsService: RegionsService) {}

  //FIND ALL LOCATION
  @Get('locations')
  getLocation() {
    return this.RegionsService.getLocation();
  }
  @Get('locationsRC')
  getLocationRC() {
    return this.RegionsService.getLocationRC();
  }
  @Get('locationsRCP')
  getLocationRCP() {
    return this.RegionsService.getLocationRCP();
  }

  //CREATE NEW LOCATIONS

  //create Country
  @Post('insertRC')
  async createCountry(@Body() data: dataLocations): Promise<void> {
    await this.RegionsService.createRC(data);
  }
  //create Proviences
  @Post('insertRCP')
  async createProvinces(@Body() data: dataLocations): Promise<void> {
    await this.RegionsService.createRCP(data);
  }
  //create Proviences
  @Post('insertRCPA')
  async createAddress(@Body() data: dataLocations): Promise<void> {
    await this.RegionsService.createRCPA(data);
  }

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
  @Post('insert')
  async createRegions(@Body() data: Regions) {
    const regions = await this.RegionsService.createRegions(data);
    console.log('data ctrl',data);
    if (!regions) {
      return 'failed insert to regions';
    } else {
      return ' success insert to regions';
    }
  }

  //update
  @Put('edit/:id')
  async update(@Param() params, @Body() body: any): Promise<any> {
    // console.log('masuk ctrl',body);
    
    return this.RegionsService.updateRegions(params.id, body);
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    const result = this.RegionsService.deleteRegions(params.id);
    if (result) {
      return `data hasbeen deleted `;
    } else {
      return ' gagal';
    }
  }
}
