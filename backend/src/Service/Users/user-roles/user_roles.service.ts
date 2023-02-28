import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/entities/UserRoles';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRoles)
    private UserRolesRepository: Repository<UserRoles>,
  ) {}

  async Create(items: UserRoles) {
    const hasil = await this.UserRolesRepository.save({
      usroUserId: items.usroUserId,
      usroRole: items.usroRole,
    });

    return {
      message: 'Data Berhasil dibuat',
      result: hasil,
    };
  }

  async findAll() {
    return await this.UserRolesRepository.find({
      select: {
        usroUserId: true,
      },
      // Untuk menampilkan tabel yang berelasi
      relations: {
        usroUser: true,
        usroRole: true,
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} userRole`;
  // }

  async update(id: number, items: UserRoles) {
    const hasil = await this.UserRolesRepository.update(
      { usroUserId: id },
      {
        usroRole: items.usroRole,
      },
    );
    return {
      Message: 'Berhasil Update',
      Hasil: hasil,
    };
  }

  async remove(id: number) {
    const result = await this.UserRolesRepository.delete({ usroUserId: id });
    if (result.affected > 0) {
      throw new HttpException(
        {
          message: 'Data User Roles Berhasil Dihapus',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: 'Data User Roles Tidak Ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
