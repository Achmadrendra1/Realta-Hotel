import { Body, Controller, Param, Post,Get } from '@nestjs/common';
import { AuthService } from 'src/Service/Auth/auth.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post()
  Insert(@Body() body) {
    return this.AuthService.Login(body.email, body.password);
  }

  @Get('/:token')
  async verif(@Param() params): Promise<any> {
    return jwt.verify(params.token, process.env.SECRET_KEY);
  }
}
