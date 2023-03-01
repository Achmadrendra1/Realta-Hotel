import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    return await this.stodRepository.find(
      { where: { stodId: id } }
    );
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

  async editStod(id: number, stod: StockDetail): Promise<any> {
    try {
      await this.stodRepository.update({
        stodId: id
      }, {
        stodBarcodeNumber: stod.stodBarcodeNumber,
        stodStatus: stod.stodStatus,
        stodNotes: stod.stodNotes,
        stodFaci: stod.stodFaci,
        stodPohe: stod.stodPohe,
        stodStock: stod.stodStock
      })
      return { message: `Congrats, you're Stock Detail has been changed` }
    } catch (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async dropStod(id: number): Promise<any> {
    await this.stodRepository.delete(
      { stodId: id }
    )
    return `Congrats, you're Stock Detail has been deleted`
  }
}
