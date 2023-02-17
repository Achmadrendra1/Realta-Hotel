import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderHeader } from 'src/entities/PurchaseOrderHeader';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderHeaderService {
    constructor(
        @InjectRepository(PurchaseOrderHeader)
        private poheRepository: Repository<PurchaseOrderHeader>
    ) { }

    async findAllPohe(): Promise<any> {
        return await this.poheRepository.find();
    }

    async findPoheNumber(pohe: PurchaseOrderHeader): Promise<any> {
        return await this.poheRepository.findOneBy({
            poheNumber: pohe.poheNumber
        });
    }

    async addPohe(pohe: PurchaseOrderHeader): Promise<any> {
        return await this.poheRepository.save({
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
            poheEmp: pohe.poheEmp
        }).then((result) => {
            return {
                message: 'Congrats, you have new purchase order header',
                result: result
            }
        }).catch((error) => {
            return {
                massage: 'Sorry, something went wrong' + error
            }
        });
    }

    async editPohe(pohe: PurchaseOrderHeader): Promise<any> {
        return await this.poheRepository.update({
            poheNumber: pohe.poheNumber
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
            poheVendor: pohe.poheVendor,
            poheEmp: pohe.poheEmp
        }).then((result) => {
            return {
                message: `Congrats, you're purchase order header has been changed`,
                result: result
            }
        }).catch((error) => {
            return {
                massage: 'Sorry, something went wrong' + error
            }
        });
    }

    async dropPohe(pohe: PurchaseOrderHeader): Promise<any> {
        return await this.poheRepository.delete({
            poheNumber: pohe.poheNumber
        }).then((result) => {
            return {
                message: `Congrats, you're purchase order header has been deleted`,
                result: result
            }
        }).catch((error) => {
            return {
                massage: 'Sorry, something went wrong' + error
            }
        });
    }

}
