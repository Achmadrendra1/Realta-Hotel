import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserProfilesService } from 'src/Service/Users/user-profiles/user-profiles.service';
import { UserProfiles } from 'src/entities/UserProfiles';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Post()
  create(@Body() item: UserProfiles) {
    return this.userProfilesService.create(item);
  }

  @Get()
  findAll() {
    return this.userProfilesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userProfilesService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: UserProfiles) {
    return this.userProfilesService.update(+id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(+id);
  }
}
