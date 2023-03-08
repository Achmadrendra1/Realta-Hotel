import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderHeader } from 'src/entities/PurchaseOrderHeader';

@Injectable()
export class PoheService {
  constructor(
    @InjectRepository(PurchaseOrderHeader)
    private poheRepository: Repository<PurchaseOrderHeader>
  ) { }

  async findAllPohe(): Promise<any> {
    return await this.poheRepository.query('select * from purchasing.getALLPoheVendor()')
  }

  async findPoheId(id: number): Promise<any> {
    return await this.poheRepository.find({ where: { poheId: id } })
  }

  async findPoheNumber(pohe: PurchaseOrderHeader): Promise<any> {
    return await this.poheRepository.findOneBy({ poheNumber: pohe.poheNumber })
  }

  async addPohe(pohe: PurchaseOrderHeader): Promise<any> {
    await this.poheRepository.save({
      poheNumber: pohe.poheNumber,
      poheStatus: pohe.poheStatus,
      poheOrderDate: pohe.poheOrderDate,
      poheSubtotal: pohe.poheSubtotal,
      poheTax: pohe.poheTax,
      poheTotalAmount: pohe.poheTotalAmount,
      poheRefund: pohe.poheRefund,
      poheArrivalDate: pohe.poheArrivalDate,
      pohePayType: pohe.pohePayType,
      poheEmp: pohe.poheEmpId,
      poheVendor: pohe.poheVendor
    })
    const res = await this.findAllPohe()
    return {
      message: `Congrats, you have new Purchase Order Header`,
      result: res
    }
  }

  async editPohe(id: number, pohe: PurchaseOrderHeader): Promise<any> {
    try {
      await this.poheRepository.update({
        poheId: id,
      }, {
        poheStatus: pohe.poheStatus
      })
      return { message: `Congrats, you're purchase order header has been changed` }
    } catch (error) {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async dropPohe(id: number): Promise<any> {
    await this.poheRepository.delete({ poheId: id })
    return `Congrats, you're purchase order header has been deleted`
  }
}
