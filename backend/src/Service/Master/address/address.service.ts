import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
//
import { Address } from 'src/entities/Address';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  // //Procedure
  // async findProcedure(){
  //   return await this.addressRepository.query('SELECT' * FROM )
  // }

  //find All
  async findAllAddress(): Promise<any> {
    return await this.addressRepository.find({
      order: {
        addrId: 'ASC',
      },
      relations: {
        addrProv: true,
      },
    });
  }

  //find by Id
  async findOneAddress(addrId: number): Promise<any> {
    return await this.addressRepository.findOne({
      where: {
        addrId: addrId,
      },
    });
  }

  //find Address by Name
  async getAddressByName(name: string): Promise<Address[]> {
    return await this.addressRepository.find({
      where: {
        addrLine2: Like(`%${name}%`),
      },
    });
  }

  //find Address by provinces
  async getAddressByProvinces(name: string): Promise<any> {
    return await this.addressRepository.find({
      where: {
        addrProv: {
          provName: Like(`%${name}%`),
        },
      },
    });
  }

  //find Address by Hotel Name
  async getAddressByHotel(name: string): Promise<any> {
    return await this.addressRepository.find({
      where: {
        hotels: {
          hotelName: Like(`%${name}%`),
        },
      },
    });
  }

  //find Address by User
  async getAddressByUser(name: string): Promise<any> {
    return await this.addressRepository
      .createQueryBuilder('address')
      .leftJoin('address.userProfiles', 'userProfiles')
      .leftJoin('userProfiles.usproUser', 'user')
      .where('user.fullName = :fullName', { fullName: name })
      .getMany();
  }

  //create new
  async createAddress(data: any): Promise<Address> {
    const address = new Address();
    address.addrLine2 = data.addr_line2;
    address.addrLine1 = data.addr_line1;
    address.addrProv = data.addr_prov_id;
    return await this.addressRepository.save(address);
  }

  //update
  async updateAddress(addrId: number, data: any): Promise<Address> {
    const address = new Address();
    address.addrLine2 = data.addr_line2;
    address.addrLine1 = data.addr_line1;
    address.addrProv = data.addr_prov_id;
    return await this.addressRepository
      .update({ addrId: addrId }, address)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteAddress(addrId: number): Promise<any> {
    return await this.addressRepository.delete({ addrId: addrId });
  }
}
