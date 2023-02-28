import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AddressService } from 'src/Service/Master/address/address.service';
import { Address } from 'src/entities/Address';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.addressService.findAllAddress();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.addressService.findOneAddress(id);
  }

  //find by Name
  @Get('name/:name')
  addressName(@Param('name') params): Promise<any> {
    return this.addressService.getAddressByName(params);
  }
  //find by Provinces
  @Get('provinces/:name')
  addressProvinces(@Param('name') params): Promise<any> {
    return this.addressService.getAddressByProvinces(params);
  }
  //find by Hotel
  @Get('hotel/:name')
  addressHotel(@Param('name') params): Promise<any> {
    return this.addressService.getAddressByHotel(params);
  }
  //find by Users
  @Get('user/:name')
  addressUser(@Param('name') params): Promise<any> {
    return this.addressService.getAddressByUser(params);
  }

  //create new
  @Post('insert')
  async create(@Body() data: Address) {
    // return this.addressService.createAddress(data);
    const address = await this.addressService.createAddress(data);
    if (!address) {
      return 'failed add to address';
    } else {
      return 'success add to address';
    }
  }

  //update
  @Put('edit/:id')
  async update(@Param() params, @Body() data: any): Promise<any> {
    // return this.addressService.updateAddress(params.id, data);
    const newData: any = await this.addressService.updateAddress(
      params.id,
      data,
    );
    if (!newData) {
      return 'hotel fail updated';
    } else {
      return 'hotel updated';
    }
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params) {
    const result = this.addressService.deleteAddress(params.id);
    if (result) {
      return ` success deleted`;
    } else {
      return ' gagal';
    }
  }
}
