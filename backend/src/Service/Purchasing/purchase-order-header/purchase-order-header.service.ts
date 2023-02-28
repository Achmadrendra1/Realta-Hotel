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
        return await this.poheRepository.find(
            { where: { poheId: id } }
        )
    }

<<<<<<< HEAD
    async findPoheNumber(pohe: PurchaseOrderHeader): Promise<any> {
        return await this.poheRepository.findOneBy(
            { poheNumber: pohe.poheNumber }
        );
    }

    async addPohe(pohe: PurchaseOrderHeader): Promise<any> {
        await this.poheRepository.save(
            {
                poheNumber: pohe.poheNumber,
                poheStatus: pohe.poheStatus,
                poheOrderDate: pohe.poheOrderDate,
                poheSubtotal: pohe.poheSubtotal,
                poheTax: pohe.poheTax,
                poheTotalAmount: pohe.poheTotalAmount,
                poheRefund: pohe.poheRefund,
                poheArrivalDate: pohe.poheArrivalDate,
                pohePayType: pohe.pohePayType,
                poheEmpId: pohe.poheEmpId,
                poheVendor: pohe.poheVendor
            }
        )
        const res = await this.findAllPohe()
        return (
            { message: `Congrats, you have new Purchase Order Header`, result: res }
        )
    }

    async editPohe(id: number, pohe: PurchaseOrderHeader): Promise<any> {
        try {
            await this.poheRepository.update({
                poheId: id
            }, {
                poheNumber: pohe.poheNumber,
                poheStatus: pohe.poheStatus,
                poheOrderDate: pohe.poheOrderDate,
                poheSubtotal: pohe.poheSubtotal,
                poheTax: pohe.poheTax,
                poheTotalAmount: pohe.poheTotalAmount,
                poheRefund: pohe.poheRefund,
                poheArrivalDate: pohe.poheArrivalDate,
                pohePayType: pohe.pohePayType,
                poheEmpId: pohe.poheEmpId,
                poheVendor: pohe.poheVendor
            })
            return { message: `Congrats, you're purchase order header has been changed` }
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async dropPohe(id: number): Promise<any> {
        await this.poheRepository.delete(
            { poheId: id }
        )
        return `Congrats, you're purchase order header has been deleted`
    }
=======
  async addPohe(pohe: PurchaseOrderHeader): Promise<any> {
    return await this.poheRepository
      .save({
        poheNumber: pohe.poheNumber,
        poheStatus: pohe.poheStatus,
        poheOrderDate: pohe.poheOrderDate,
        poheSubtotal: pohe.poheSubtotal,
        poheTax: pohe.poheTax,
        poheTotalAmount: pohe.poheTotalAmount,
        poheRefund: pohe.poheRefund,
        poheArrivalDate: pohe.poheArrivalDate,
        pohePayType: pohe.pohePayType,
        poheVendor: pohe.poheVendor,
        poheEmpId: pohe.poheEmp,
      })
      .then((result) => {
        return {
          message: 'Congrats, you have new purchase order header',
          result: result,
        };
      })
      .catch((error) => {
        return {
          massage: 'Sorry, something went wrong' + error,
        };
      });
  }

  async editPohe(pohe: PurchaseOrderHeader): Promise<any> {
    return await this.poheRepository
      .update(
        {
          poheNumber: pohe.poheNumber,
        },
        {
          poheNumber: pohe.poheNumber,
          poheStatus: pohe.poheStatus,
          poheOrderDate: pohe.poheOrderDate,
          poheSubtotal: pohe.poheSubtotal,
          poheTax: pohe.poheTax,
          poheTotalAmount: pohe.poheTotalAmount,
          poheRefund: pohe.poheRefund, 
          pohePayType: pohe.pohePayType,
          poheVendor: pohe.poheVendor,
          poheEmp: pohe.poheEmp,
        },
      )
      .then((result) => {
        return {
          message: `Congrats, you're purchase order header has been changed`,
          result: result,
        };
      })
      .catch((error) => {
        return {
          massage: 'Sorry, something went wrong' + error,
        };
      });
  }
>>>>>>> 6c2deb00bcb595d858c523cf3b8982f0d1717d0f

}
