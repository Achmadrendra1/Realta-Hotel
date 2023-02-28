import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/Roles';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly RolesRepository: Repository<Roles>,
  ) {}

  async CreateRoles(item: Roles) {
    return await this.RolesRepository.save(item);
  }

  async findAll() {
    return await this.RolesRepository.find();
  }

  async findOne(id: number) {
    return await this.RolesRepository.findOneBy({ roleId: id });
  }

  async update(id: number, item: Roles) {
    const hasil = await this.RolesRepository.update(
      { roleId: id },
      { roleName: item.roleName },
    );
    return {
      Message: 'Berhasil Update',
      Hasil: hasil,
    };
  }

  async Delete(id: number) {
    const hasil = await this.RolesRepository.delete({ roleId: id });
    return {
      Message: 'Berhasil Delete',
      Hasil: hasil,
    };
  }
}
