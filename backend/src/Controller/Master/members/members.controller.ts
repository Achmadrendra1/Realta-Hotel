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
@Controller('members')
export class MembersController {
  constructor(private MembersService: MembersService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.MembersService.findAllMembers();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.MembersService.findOneMembers(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.MembersService.createMembers(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.MembersService.updateMembers(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.MembersService.deleteMembers(params.id);
  }
}
