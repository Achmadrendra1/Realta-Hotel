import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from 'src/entities/Vendor';
import { Like, Repository } from 'typeorm';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async findAllVendor(): Promise<any> {
    return await this.vendorRepository.find();
  }

  async findVendorName(vendorName: string): Promise<any> {
    return await this.vendorRepository.find({
      where: { vendorName: Like('%' + vendorName + '%') },
    });
  }

  async addVendor(vendor: Vendor): Promise<any> {
    return await this.vendorRepository
      .save({
        vendorName: vendor.vendorName,
        vendorActive: vendor.vendorActive,
        vendorPriority: vendor.vendorPriority,
        vendorRegisterDate: vendor.vendorRegisterDate,
        vendorWeburl: vendor.vendorWeburl,
        vendorModifiedDate: new Date(),
      })
      .then((result) => {
        return {
          message: `Congrats, you have new Vendor`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }

  async editVendor(vendor: Vendor): Promise<any> {
    return await this.vendorRepository
      .update(
        {
          vendorName: vendor.vendorName,
        },
        {
          vendorName: vendor.vendorName,
          vendorActive: vendor.vendorActive,
          vendorPriority: vendor.vendorPriority,
          vendorRegisterDate: vendor.vendorRegisterDate,
          vendorWeburl: vendor.vendorWeburl,
          vendorModifiedDate: new Date(),
        },
      )
      .then((result) => {
        return {
          message: `Congrats, you're vendor has been changed`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }

  async dropVendor(vendor: Vendor): Promise<any> {
    return await this.vendorRepository.delete({
      vendorName: vendor.vendorName,
    });
  }
}
