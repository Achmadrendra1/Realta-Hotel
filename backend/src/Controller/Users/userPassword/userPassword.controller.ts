import {
  Body,
  Controller,
  Get,
  Param,
  Put
} from '@nestjs/common';
import { UserPasswordService } from 'src/Service/Users/user-password/userPassword.service';

@Controller('password')
export class UsersPasswordController {
  constructor(private UsersPassword: UserPasswordService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.UsersPassword.findById(id);
  }

  @Put(':id')
  ChangePassword(@Param('id') id :string,@Body() newPassword){
    return this.UsersPassword.ChangePassword(+id,newPassword);
  }
}
