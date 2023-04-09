import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from 'src/entities/Hotels';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private hotelRepository: Repository<Hotels>,
  ) {}

  async findAllHotels(query?) {
    const take = query?.take || 10;
    const page = query?.page || 1;
    const skip = (page - 1) * take;
    const keyword = query?.keyword || '';
    const [data, total] = await this.hotelRepository.findAndCount({
      order: {
        hotelId: 'ASC',
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
      where: { hotelName: ILike(`%${keyword}%`) },
      skip,
      take,
    });
    return {
      data,
      page,
      count: total,
      currentPage: +page,
    };
  }

  async findByNameId(hotelId: number): Promise<any> {
    return await this.hotelRepository.find({
      where: { hotelId },
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
  // async findByLocation(hotelId: number): Promise<any> {
  //   return await this.hotelRepository.find({
  //     where: [{}]
  //   });
  // }

  async findByHotelName(hotelName: any): Promise<any> {
    return await this.hotelRepository.find({
      where: [{ hotelName }],
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

  async addNewHotel(hotel: any): Promise<any> {
    const date = new Date();
    return await this.hotelRepository
      .save({
        hotelName: hotel.hotelName,
        hotelDescription: hotel.hotelDescription,
        hotelRatingStar: hotel.hotelRatingStar,
        hotelPhonenumber: hotel.hotelPhonenumber,
        hotelModifiedDate: date,
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

  async UpdateHotel(hotelId: any, hotel: Hotels): Promise<any> {
    const date = new Date();

    return await this.hotelRepository
      .update(hotelId, {
        hotelName: hotel.hotelName,
        hotelDescription: hotel.hotelDescription,
        hotelRatingStar: hotel.hotelRatingStar,
        hotelPhonenumber: hotel.hotelPhonenumber,
        hotelModifiedDate: date,
        hotelAddr: hotel.hotelAddr,
      })
      .then((result) => {
        return this.hotelRepository.findOne({
          where: { hotelId: hotelId },
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
      })
      .catch((err) => {
        return `Failed to Update Hotel` + err;
      });
  }

  async deleteHotels(id: Hotels) {
    console.log(id);

    await this.hotelRepository
      .delete(id)
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
