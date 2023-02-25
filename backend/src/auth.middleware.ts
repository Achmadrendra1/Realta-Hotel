import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    } else {
      try {
        jwt.verify(auth, process.env.SECRET_KEY);
        console.log('Verified');
        next();
      } catch (e: any) {
        throw new HttpException('Unverified Token', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
