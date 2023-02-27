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
import { RolesService } from 'src/Service/Users/roles/roles.service';
import { Roles } from 'src/entities/Roles';

@Controller('roles')
export class RolesController {
  constructor(private RolesService: RolesService) {}

  @Post()
  CreateRoles(@Body() item: Roles) {
    return this.RolesService.CreateRoles(item);
  }

  @Get()
  findAll() {
    return this.RolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RolesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: Roles) {
    return this.RolesService.update(+id, item);
  }

  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.RolesService.Delete(+id);
  }
}
