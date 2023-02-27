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
import { UserBonusPointsService } from 'src/Service/Users/user-bonus-points/user-bonus-points.service';
import { UserBonusPoints } from 'src/entities/UserBonusPoints';

@Controller('user-bonus-points')
export class UserBonusPointsController {
  constructor(
    private readonly userBonusPointsService: UserBonusPointsService,
  ) {}

  @Post()
  create(@Body() item: UserBonusPoints) {
    return this.userBonusPointsService.create(item);
  }

  @Get()
  findAll() {
    return this.userBonusPointsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userBonusPointsService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() items: UserBonusPoints) {
    return this.userBonusPointsService.update(+id, items);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBonusPointsService.remove(+id);
  }
}
