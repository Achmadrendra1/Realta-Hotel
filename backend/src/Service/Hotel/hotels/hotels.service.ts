import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from 'src/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private hotelRepository: Repository<Hotels>,
  ) {}

  async findAllHotels(): Promise<any> {
    return await this.hotelRepository.find({
      order: {
        hotelName: 'ASC',
      },
      relations: {
        facilities: {
          facilityPhotos: true,
          facilityPriceHistories: true,
          faciCagro: true,
        },
        hotelReviews: true,
        hotelAddr: true,
      },
    });
  }

  async findByNameId(hotelId: number): Promise<any> {
    return await this.hotelRepository.findOneBy({
      hotelId,
    });
  }
  // async findByLocation(hotelId: number): Promise<any> {
  //   return await this.hotelRepository.find({
  //     where: [{}]
  //   });
  // }

  async addNewHotel(hotel: Hotels): Promise<any> {
    return await this.hotelRepository
      .save({
        hotelName: hotel.hotelName,
        hotelDescription: hotel.hotelDescription,
        hotelRatingStar: hotel.hotelRatingStar,
        hotelPhonenumber: hotel.hotelPhonenumber,
        hotelModifiedDate: hotel.hotelModifiedDate,
        hotelAddr: hotel.hotelAddr,
      })
      .then((result) => {
        return {
          message: `Hotel successfuly added to the system`,
          result: result,
        };
      })
      .catch((error) => {
        return `Hotel failed adding to the system` + error;
      });
  }

  async UpdateHotel(id: number, hotel: Hotels): Promise<any> {
    return await this.hotelRepository
      .update(
        {
          hotelId: id,
        },
        {
          hotelName: hotel.hotelName,
          hotelDescription: hotel.hotelDescription,
          hotelRatingStar: hotel.hotelRatingStar,
          hotelPhonenumber: hotel.hotelPhonenumber,
          hotelModifiedDate: hotel.hotelModifiedDate,
          hotelAddr: hotel.hotelAddr,
        },
      )
      .then((result) => {
        return {
          message: `Hotel successfully updated`,
          result: result,
        };
      })
      .catch((err) => {
        return `Failed to Update Hotel`;
      });
  }

  async deleteHotels(id: Hotels) {
    await this.hotelRepository
      .delete({
        hotelId: id.hotelId,
      })
      .then((result) => {
        return {
          message: `Hotels successfully deleted`,
          result: result,
        };
      })
      .catch((error) => {
        return `Failed to Delete` + error;
      });
  }
}
