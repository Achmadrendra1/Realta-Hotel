import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelReviews } from 'src/entities/HotelReviews';
import { Repository } from 'typeorm';

@Injectable()
export class HotelReviewsService {
  constructor(
    @InjectRepository(HotelReviews)
    private hotelReviewsRepository: Repository<HotelReviews>,
  ) {}
  async findAllHotelsReviews() {
    return await this.hotelReviewsRepository.find();
  }

  async findReviewById(hotel: HotelReviews) {
    return await this.hotelReviewsRepository.findOneBy({
      horeId: hotel.horeId,
    });
  }

  async addNewHotelReviews(hotel: HotelReviews): Promise<any> {
    return await this.hotelReviewsRepository
      .save({
        horeUserReview: hotel.horeUserReview,
        horeRating: hotel.horeRating,
        horeCreatedOn: hotel.horeCreatedOn,
        horeHotel: hotel.horeHotel,
        horeUser: hotel.horeUser,
      })
      .then((result) => {
        return {
          message: `Hotel Reviews successfuly added to the system`,
          result: result,
        };
      })
      .catch((error) => {
        return `failed adding Hotel Reviews to the system` + error;
      });
  }

  async UpdateHotelReviews(Id: number, hotel: HotelReviews): Promise<any> {
    return await this.hotelReviewsRepository
      .update(
        {
          horeId: Id,
        },
        {
          horeUserReview: hotel.horeUserReview,
          horeRating: hotel.horeRating,
          horeCreatedOn: hotel.horeCreatedOn,
          horeHotel: hotel.horeHotel,
          horeUser: hotel.horeUser,
        },
      )
      .then((result) => {
        return {
          message: `Hotel reviews successfully updated`,
          result: result,
        };
      })
      .catch((err) => {
        return `Failed to Update Hotel reviews`;
      });
  }

  async deleteHotelsReviews(id: HotelReviews): Promise<any> {
    await this.hotelReviewsRepository
      .delete({
        horeId: id.horeId,
      })
      .then((result) => {
        return {
          message: `Hotels Reviews successfully deleted`,
          result: result,
        };
      })
      .catch((error) => {
        return `Failed to Delete` + error;
      });
  }
}
