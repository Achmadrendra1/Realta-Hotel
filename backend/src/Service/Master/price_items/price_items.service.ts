import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
//
import { PriceItems } from 'src/entities/PriceItems';
@Injectable()
export class PriceItemsService {
  constructor(
    @InjectRepository(PriceItems)
    private priceItemsRepository: Repository<PriceItems>,
  ) {}

  //find All
  async findAllPriceItems(): Promise<any> {
    return await this.priceItemsRepository.find({
      order: {
        pritId: 'ASC',
      },
    });
  }

  //find by Id
  async findOnePriceItems(pritId: number): Promise<any> {
    return await this.priceItemsRepository.findOne({
      where: {
        pritId: pritId,
      },
    });
  }
  //find price item by Name
  async getPriceByName(name: string): Promise<any> {
    return await this.priceItemsRepository.find({
      where: {
        pritName: Like(`%${name}%`),
      },
    });
  }
  //find price item by hotel
  async getPriceItemByHotelName(name: string): Promise<any> {
    return await this.priceItemsRepository
      .createQueryBuilder('priceItems')
      .leftJoinAndSelect(
        'priceItems.bookingOrderDetailExtras',
        'bookingOrderDetailExtras',
      )
      .leftJoinAndSelect(
        'bookingOrderDetailExtras.boexBorde',
        'bookingOrderDetail',
      )
      .leftJoinAndSelect('bookingOrderDetail.borderBoor', 'bookingOrders')
      .leftJoinAndSelect('bookingOrders.boorHotel', 'hotels')
      .where('priceItems.name = :name', { name })
      .select('hotels.hotelName')
      .getOne();
  }

  async createPriceItems(data: PriceItems): Promise<PriceItems> {
    return await this.priceItemsRepository.save(
      this.priceItemsRepository.create(data),
    );
  }

  //update
  async updatePriceItems(pritId: number, data: PriceItems): Promise<any> {
    return await this.priceItemsRepository
      .update({ pritId: pritId }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deletePriceItems(pritId: number): Promise<any> {
    return await this.priceItemsRepository
      .delete({ pritId: pritId })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
