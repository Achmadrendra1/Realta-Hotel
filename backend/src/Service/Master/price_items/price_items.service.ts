import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return await this.priceItemsRepository.find();
      }
    
      //find by Id
      async findOnePriceItems(pritId: number): Promise<any> {
        return await this.priceItemsRepository.findOne({
          where: {
            pritId: pritId,
          },
        });
      }
    
      //create new
      async createPriceItems(data: PriceItems): Promise<any> {
        return await this.priceItemsRepository
          .save(data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
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
