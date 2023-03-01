import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderDetail } from 'src/entities/PurchaseOrderDetail';

@Injectable()
export class PodeService {
  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private podeRepository: Repository<PurchaseOrderDetail>
  ) { }

  async findAllPode(): Promise<any> {
    return await this.podeRepository.query('select * from purchasing.getALLPode()')
  }

  async findPodeId(id: number): Promise<any> {
    return await this.podeRepository.find(
      { where: { podeId: id } }
    )
  }

  async addPode(pode: PurchaseOrderDetail): Promise<any> {
    await this.podeRepository.save(
      {
        podePohe: pode.podePohe,
        podeOrderQty: pode.podeOrderQty,
        podePrice: pode.podePrice,
        podeLineTotal: pode.podeLineTotal,
        podeReceivedQty: pode.podeReceivedQty,
        podeRejectedQty: pode.podeRejectedQty,
        podeStockedQty: pode.podeStockedQty,
        podeModifiedDate: new Date(),
        podeStock: pode.podeStock
      }
    )
    const res = await this.findAllPode()
    return (
      { message: `Congrats, you have new Purchase Order Detail`, result: res }
    )
  }

  async editPode(id: number, pode: PurchaseOrderDetail): Promise<any> {
    try {
      await this.podeRepository.update({
        podeId: id
      }, {
        podePohe: pode.podePohe,
        podeOrderQty: pode.podeOrderQty,
        podePrice: pode.podePrice,
        podeLineTotal: pode.podeLineTotal,
        podeReceivedQty: pode.podeReceivedQty,
        podeRejectedQty: pode.podeRejectedQty,
        podeStockedQty: pode.podeStockedQty,
        podeModifiedDate: new Date(),
        podeStock: pode.podeStock
      })
      return { message: `Congrats, you're purchase order detail has been changed` }
    } catch (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async dropPode(id: number): Promise<any> {
    await this.podeRepository.delete(
      { podeId: id }
    )
    return `Congrats, you're purchase order detail has been deleted`
  }
}