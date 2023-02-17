import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from 'src/entities/Stocks';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stocks)
    private stockRepository: Repository<Stocks>,
  ) {}

  // Tampilkan msg kalau data kosong

  async findAllStock(): Promise<any> {
    return await this.stockRepository.find();
  }

  async findStockName(stock: Stocks): Promise<any> {
    return await this.stockRepository.findOneBy({
      stockName: stock.stockName,
    });
  }

  async addNewStock(stock: Stocks): Promise<any> {
    return await this.stockRepository
      .save({
        stockName: stock.stockName,
        stockDescription: stock.stockDescription,
        stockQuantity: stock.stockQuantity,
        stockReorderPoint: stock.stockReorderPoint,
        stockUsed: stock.stockUsed,
        stockScrap: stock.stockScrap,
        stockSize: stock.stockSize,
        stockColor: stock.stockColor,
        stockModifiedDate: new Date(),
      })
      .then((result) => {
        return {
          message: `Congrats, you have new Stock`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }

  // Ga bisa rename stockName
  async editStock(stock: Stocks): Promise<any> {
    return await this.stockRepository
      .update(
        {
          stockName: stock.stockName,
        },
        {
          stockName: stock.stockName,
          stockDescription: stock.stockDescription,
          stockQuantity: stock.stockQuantity,
          stockReorderPoint: stock.stockReorderPoint,
          stockUsed: stock.stockUsed,
          stockScrap: stock.stockScrap,
          stockSize: stock.stockSize,
          stockColor: stock.stockColor,
          stockModifiedDate: new Date(),
        },
      )
      .then((result) => {
        return {
          message: `Congrats, you're Stock has been changed`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }

  async dropStock(stock: Stocks): Promise<any> {
    return this.stockRepository
      .delete({
        stockName: stock.stockName,
      })
      .then((result) => {
        return {
          message: `Congrats, you're Stock has been deleted`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }
}
