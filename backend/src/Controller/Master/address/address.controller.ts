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

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.addressService.createAddress(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.addressService.updateAddress(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.addressService.deleteAddress(params.id);
  }
}
