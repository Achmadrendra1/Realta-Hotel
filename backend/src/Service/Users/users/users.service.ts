import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as DataEnum from 'src/DataEnum';
import { UserPassword } from 'src/entities/UserPassword';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
    @InjectRepository(UserPassword)
    private readonly UserPasswordRepository: Repository<UserPassword>,
  ) {}

  async findAll(): Promise<any> {
    return await this.UsersRepository.find();
  }

  async findOne(id: any): Promise<any> {
    return await this.UsersRepository.findOne(id);
  }

  async findByEmail(userEmail: any): Promise<any> {
    return await this.UsersRepository.query(
      `select * from users.getUserDetail($1)`,
      [userEmail],
    );
  }

  // async register(userID: number, userFullName: string, userEmail: string, userPhoneNumber: string, UserPassword: string): Promise<any> {
  //   return await this.UsersRepository.query('CALL users.Register($1, $2, $3, $4, $5)', [userID, userFullName, userEmail, userPhoneNumber, UserPassword]);
  // }
  async getUser(): Promise<any>{
    return await this.UsersRepository.query('select * from users.getUserDetail()');
  }


  async UpdateUser(id: number, item: Users) {
    return await this.UsersRepository.update(
      { userId: id },
      {
        userFullName: item.userFullName,
        userType: item.userType,
        userEmail: item.userEmail,
        userCompanyName: item.userCompanyName,
        userPhoneNumber: item.userPhoneNumber,
        userModifiedDate: new Date(),
      },
    ).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

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
