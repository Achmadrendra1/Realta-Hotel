import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/Service/Users/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  findAll(): Promise<any> {
    return this.UsersService.findAll();
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.UsersService.findOne(+id);
  // }
  
  @Get(':email')
  findByEmail(@Param('email') email: string ){
    return this.UsersService.findByEmail(email);
  }
  
  
  @Put(':id')
  updateProfile(@Param('id') id: string, @Body() Body) {
    return this.UsersService.updateProfile(+id, Body);
  }
  

  @Post()
  async register(@Body() data): Promise<any> {
    return await this.UsersService.register(data);
  }

  // @Get()
  // getUser():Promise<any>{
  //   return this.UsersService.getUser();
  // }

//   @Post()
//  async Register(@Body() userData: any) {
//     const { userID, userFullName, userEmail, userPhoneNumber, UserPassword } = userData;
//     return await this.UsersService.register(userID, userFullName, userEmail, userPhoneNumber, UserPassword);
//   }


  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.UsersService.Delete(+id);
  }
}
