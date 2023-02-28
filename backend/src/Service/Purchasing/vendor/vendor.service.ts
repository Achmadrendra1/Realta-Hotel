import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Vendor } from 'src/entities/Vendor';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

<<<<<<< HEAD
    async findAllVendor(): Promise<any> {
        return await this.vendorRepository.find()
    }

    async findVendorId(id: number): Promise<any> {
        return await this.vendorRepository.find(
            { where: { vendorId: id } }
        );
    }

    async findVendorName(vendor: Vendor): Promise<any> {
        return await this.vendorRepository.find(
            { where: { vendorName: Like('%' + vendor.vendorName + '%') } }
        )
    }

    async addVendor(vendor: Vendor): Promise<any> {
        await this.vendorRepository.save(
            {
                vendorName: vendor.vendorName,
                vendorActive: vendor.vendorActive,
                vendorPriority: vendor.vendorPriority,
                vendorRegisterDate: vendor.vendorRegisterDate,
                vendorWeburl: vendor.vendorWeburl,
                vendorModifiedDate: new Date()
            }
        )
        const res = await this.findAllVendor()
        return (
            { message: `Congrats, you have new Vendor`, result: res }
        )
    }

    async editVendor(id: number, vendor: Vendor): Promise<any> {
        try {
            await this.vendorRepository.update({
                vendorId: id
            }, {
                vendorName: vendor.vendorName,
                vendorActive: vendor.vendorActive,
                vendorPriority: vendor.vendorPriority,
                vendorRegisterDate: vendor.vendorRegisterDate,
                vendorWeburl: vendor.vendorWeburl,
                vendorModifiedDate: new Date()
            })
            return { message: `Congrats, you're vendor has been changed` }
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async dropVendor(id: number): Promise<any> {
        await this.vendorRepository.delete(
            { vendorId: id }
        )
        return `Congrats, you're vendor has been deleted`
    }
=======
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
>>>>>>> 6c2deb00bcb595d858c523cf3b8982f0d1717d0f
}
