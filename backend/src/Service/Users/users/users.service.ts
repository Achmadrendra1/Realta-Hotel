import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from 'src/entities/UserProfiles';
import { UserRoles } from 'src/entities/UserRoles';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

interface User {
  user_id: any;
  user_full_name: any;
  user_type: any;
  user_company_name: any;
  user_email: any;
  user_phone_number: any;
  user_modified_date: Date;
  uspro_national_id: any;
  uspro_birt_date: any;
  uspro_job_title: any;
  uspro_marital_status: any;
  uspro_gender: any;

  usro_role: any;
  uspa_password_hash: any;
  uspa_user: any;
}

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
    @InjectRepository(UserProfiles)
    private readonly UserProfilesRepository: Repository<UserProfiles>,
    @InjectRepository(UserRoles)
    private readonly UserRolesRepository: Repository<UserRoles>,
  ) {}

  async findAll(): Promise<any> {
    return await this.UsersRepository.find();
  }

  async findByEmail(userEmail: any): Promise<any> {
    return await this.UsersRepository.query(
      `select * from users.getUserDetail($1)`,
      [userEmail],
    );
  }

 

  // async register(data: User): Promise<any> {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(data.uspa_password_hash, salt);

  //   // Insert new user to Users table and retrieve the new user's ID
  //   const newUser = await this.UsersRepository.create({
  //     userFullName: data.user_full_name,
  //     userEmail: data.user_email,
  //     userPhoneNumber: data.user_phone_number,
  //     userModifiedDate: new Date(),
  //   });
  //   await this.UsersRepository.save(newUser);

  //   // Insert the new user's password to UserPassword table
  //   const newUserPassword = await this.UserPasswordRepository.create({
  //     uspaUser: newUser,
  //     uspaPasswordhash: hashedPassword,
  //     uspaPasswordsalt: salt,
  //   });
  //   await this.UserPasswordRepository.save(newUserPassword);
  // }

  async register(user: any): Promise<any> {
    try {
      return await this.UsersRepository.query(
        'CALL users.Register($1, $2, $3, $4)',
        [
          user.userFullName,
          user.userEmail,
          user.userPhoneNumber,
          user.UserPassword,
        ],
      )  
    } catch (error) {
      
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  


  // async UpdateUser(id: number, item: Users) {
  //   return await this.UsersRepository.update(
  //     { userId: id },
  //     {
  //       userFullName: item.userFullName,
  //       userType: item.userType,
  //       userEmail: item.userEmail,
  //       userCompanyName: item.userCompanyName,
  //       userPhoneNumber: item.userPhoneNumber,
  //       userModifiedDate: new Date(),
  //     },
  //   ).catch((err) => {
  //     throw new HttpException(
  //       {
  //         message: err.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   });
  // }

  async Delete(id: number) {
    const result = await this.UsersRepository.delete({ userId: id });
    if (result.affected > 0) {
      throw new HttpException(
        {
          message: 'Data User Account Berhasil Dihapus',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: 'Data User Account Tidak Ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateProfile(id: any, data: User): Promise<any> {
    try {
      const result = await this.UsersRepository.createQueryBuilder()
      .update()
      .set({
        userFullName: data.user_full_name,
        userType: data.user_type,
        userCompanyName: data.user_company_name,
        userEmail: data.user_email,
        userPhoneNumber: data.user_phone_number,
        userModifiedDate: new Date(),
      })
      .where('userId = :id', { id })
      .execute();
    await this.UserProfilesRepository.createQueryBuilder()
      .update()
      .set({
        usproNationalId: data.uspro_national_id,
        usproBirtDate: data.uspro_birt_date,
        usproJobTitle: data.uspro_job_title,
        usproMartialStatus: data.uspro_marital_status,
        usproGender: data.uspro_gender,
      })
      .where('usproUser = :id', { id })
      .execute();
    await this.UserRolesRepository.createQueryBuilder()
      .update()
      .set({
        usroRole: data.usro_role,
      })
      .where('usroUserId=:id', { id })
      .execute();
    return `Message : Data berhasil di Ubah! 
    Hasil : ${result}`;
    } catch (error) {
      throw new HttpException(
            {
              message: error.message,
            },
            HttpStatus.OK,
          );
    }
 
  }


  //Cek status delete
  // if (result.affected > 0) {
  //   throw new HttpException(
  //     {
  //       message: 'Data User Account Berhasil Dihapus',
  //     },
  //     HttpStatus.OK,
  //   );
  // } else {
  //   throw new HttpException(
  //     {
  //       message: 'Data User Account Tidak Ditemukan',
  //     },
  //     HttpStatus.NOT_FOUND,
  //   );
  // }

  // .catch((err) => {
  //         throw new HttpException(
  //           {
  //             message: err.message,
  //           },
  //           HttpStatus.BAD_REQUEST,
  //         );
  //       });

  // Get Data yang diupdate
  // const updated = await this.getByAccNumber(accNumber);
  // return {
  //   message: 'Data User Account Berhasil di Update',
  //   result: updated,
  // };
}

