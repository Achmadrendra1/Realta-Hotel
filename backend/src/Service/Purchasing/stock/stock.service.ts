import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Stocks } from 'src/entities/Stocks';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stocks)
    private stockRepository: Repository<Stocks>
  ) { }

  async findAllStock(): Promise<any> {
    return await this.stockRepository.find({ order: { stockId: 'desc' } })
  }

  async stockCart(): Promise<any> {
    return await this.stockRepository.query('select * from purchasing.getALLStockCart()')
  }

  async findStockId(id: number): Promise<any> {
    return await this.stockRepository.find(
      { where: { stockId: id } }
    );
  }

  async findStockName(stockName: string): Promise<any> {
    return await this.stockRepository.find(
      { where: { stockName: Like('%' + stockName + '%') } }
    )
  }

  async addNewStock(stock: Stocks): Promise<any> {
    await this.stockRepository.save(
      {
        stockName: stock.stockName,
        stockDescription: stock.stockDescription,
        stockQuantity: stock.stockQuantity,
        stockReorderPoint: stock.stockReorderPoint,
        stockUsed: stock.stockUsed,
        stockScrap: stock.stockScrap,
        stockSize: stock.stockSize,
        stockColor: stock.stockColor,
        stockModifiedDate: new Date()
      }
    )
    const res = await this.findAllStock()
    return (
      { message: `Congrats, you have new Stock`, result: res }
    )
  }

  async editStock(id: number, stock: Stocks): Promise<any> {
    return await this.stockRepository.update({
      stockId: id
    }, {
      stockName: stock.stockName,
      stockDescription: stock.stockDescription,
      stockQuantity: stock.stockQuantity,
      stockReorderPoint: stock.stockReorderPoint,
      stockUsed: stock.stockUsed,
      stockScrap: stock.stockScrap,
      stockSize: stock.stockSize,
      stockColor: stock.stockColor,
      stockModifiedDate: new Date()
    })
  }

  async dropStock(id: number): Promise<any> {
    await this.stockRepository.delete(
      { stockId: id }
    )
    return `Congrats, you're Stock has been deleted`
  }
}
