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
import { UserRolesService } from 'src/Service/Users/user-roles/user_roles.service';
import { UserRoles } from 'src/entities/UserRoles';
@Controller('users-roles')
export class UserRolesController {
  constructor(private userRolesService: UserRolesService) {}

  @Post()
  Create(@Body() Body) {
    return this.userRolesService.Create(Body);
  }

  @Get()
  findAll(): Promise<any> {
    return this.userRolesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: any, @Body() item: UserRoles) {
    return this.userRolesService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(+id);
  }
}
