import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockDetail } from 'src/entities/StockDetail';

@Injectable()
export class StodService {
  constructor(
    @InjectRepository(StockDetail)
    private stodRepository: Repository<StockDetail>
  ) { }

  async findAllStod(): Promise<any> {
    return await this.stodRepository.query('select * from purchasing.getALLStod()')
  }

  async findStodId(id: number): Promise<any> {
    return await this.stodRepository.query('select * from purchasing.getALLStod() where stockdet_id = $1', [id])
  }

  async addNewStod(stod: StockDetail): Promise<any> {
    await this.stodRepository.save(
      {
        stodBarcodeNumber: stod.stodBarcodeNumber,
        stodStatus: stod.stodStatus,
        stodNotes: stod.stodNotes,
        stodFaci: stod.stodFaci,
        stodPohe: stod.stodPohe,
        stodStock: stod.stodStock
      }
    )
    const res = await this.findAllStod()
    return (
      { message: `Congrats, you have new Stock Detail`, result: res }
    )
  }

  async editStod(id: number, stod: any): Promise<any> {
    try {
      await this.stodRepository.update({
        stodId: id
      }, {
        stodStatus: stod.stockdet_status,
        stodFaci: stod.stockdet_facilities
      })
      const res = await this.findStodId(id)
      return {
        message: `Congrats, you're Stock Detail has been changed`,
        result: res
      }
    } catch (error) {
      console.log(error)
    }
  }

  async dropStod(id: number): Promise<any> {
    await this.stodRepository.delete(
      { stodId: id }
    )
    return `Congrats, you're Stock Detail has been deleted`
  }
}
