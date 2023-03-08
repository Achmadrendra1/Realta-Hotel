import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserPassword } from 'src/entities/UserPassword';
import { Repository } from 'typeorm';

interface Change {
    uspa_user_id: any;
    uspa_passwordhash : any;
    new_password:any;
    old_password:any;

}

@Injectable()
export class UserPasswordService {
  constructor(
    @InjectRepository(UserPassword)
    private readonly UserPasswordRepository: Repository<UserPassword>,
  ) {}

  async findById(id:any) :Promise<any>{
    const result = await this.UserPasswordRepository.findOneBy({uspaUserId:id})
    return result;
    
  }  

   // Change Password
   async ChangePassword(id: any,item:Change) :Promise<any>{
        // Validasi user
        // const user = await this.UserPasswordRepository.findOne(id);
        // if (!user) {
        //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        // }
        // Password baru
        
        // const passwordMatch = await bcrypt.compare(item.old_password, item.uspa_passwordhash);
        // if (!passwordMatch) {
        //   throw new HttpException('Current password is incorrect', HttpStatus.BAD_REQUEST);
        // }
        try {
          // Validasi Password 
        const newPasswordHash = await bcrypt.hash(item.uspa_passwordhash, 10);
        const salt = await bcrypt.genSalt(10);
         await this.UserPasswordRepository.createQueryBuilder()
        .update()
        .set({
        uspaPasswordhash: newPasswordHash,
        uspaPasswordsalt: salt
        })
        .where('uspaUserId = :id', { id })
        .execute();
        return 'Message : Password berhasil di Ubah!';   
        } catch (error) {
          throw new HttpException(
            {
              message: error.message,
            },
            HttpStatus.OK,
          );
          
        }
   
  }

}