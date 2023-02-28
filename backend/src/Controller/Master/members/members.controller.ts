import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MembersService } from 'src/Service/Master/members/members.service';
import { Members } from 'src/entities/Members';
@Controller('members')
export class MembersController {
  constructor(private MembersService: MembersService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.MembersService.findAllMembers();
  }

  //find by Name
  @Get('/nama/:name')
  findById(@Param('name') params): Promise<any> {
    return this.MembersService.findOneMembers(params);
  }

  //find by Name
  @Get('/name/:name')
  priceName(@Param('name') params): Promise<any> {
    return this.MembersService.getMemberByName(params);
  }

  @Post('insert')
  async createMembers(@Body() data: Members) {
    const Members = await this.createMembers(data);
    if (!Members) {
      return 'failed insert to regions';
    } else {
      return ' success insert to regions';
    }
  }

  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.MembersService.updateMembers(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params): Promise<any> {
    return this.MembersService.deleteMembers(params.id);
  }
}
