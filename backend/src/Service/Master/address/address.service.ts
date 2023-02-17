import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Address } from 'src/entities/Address';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  //find All
  async findAllAddress(): Promise<any> {
    return await this.addressRepository.find();
  }

  //find by Id
  async findOneAddress(addrId: number): Promise<any> {
    return await this.addressRepository.findOne({
      where: {
        addrId: addrId,
      },
    });
  }

  //create new
  async createAddress(data: Address): Promise<any> {
    return await this.addressRepository
      .save(data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //update
  async updateAddress(addrId: number, data: Address): Promise<any> {
    return await this.addressRepository
      .update({ addrId: addrId }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteAddress(addrId: number): Promise<any> {
    return await this.addressRepository
      .delete({ addrId: addrId })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
