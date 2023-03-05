import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../Users/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  async Login(userEmail: any, password: any): Promise<any> {
        const users = await this.UserService.findByEmail(userEmail);
        if (users.length == 0) {
          throw new HttpException(
            { message: 'No user found' },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          if (await bcrypt.compare(password, users[0].uspa_passwordhash)) {
            delete users[0].uspa_passwordhash;
            let token = jwt.sign({ users }, process.env.SECRET_KEY, {
              expiresIn: '24h',
            });
            let verify = jwt.verify(token, process.env.SECRET_KEY);
            return { message: 'Login berhasil!', token: token, data: verify };
          } else {
            throw new HttpException(
              { message: 'Wrong Password' },
              HttpStatus.BAD_REQUEST,
            );
          }
        }
    
 
  }
}
