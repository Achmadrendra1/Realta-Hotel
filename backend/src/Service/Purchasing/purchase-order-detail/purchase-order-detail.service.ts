import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from 'src/entities/PurchaseOrderDetail';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderDetailService {
  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private podeRepository: Repository<PurchaseOrderDetail>,
  ) {}

  async findAllPode() {
    return await this.podeRepository.find();
  }

  async findPodeId(pode: PurchaseOrderDetail): Promise<any> {
    return await this.podeRepository.findOneBy({
      podeId: pode.podeId,
    });
  }

  async addPode(pode: PurchaseOrderDetail): Promise<any> {
    return await this.podeRepository
      .save({
        podePohe: pode.podePohe,
        podeOrderQty: pode.podeOrderQty,
        podePrice: pode.podePrice,
        podeLineTotal: pode.podeLineTotal,
        podeReceivedQty: pode.podeReceivedQty,
        podeRejectedQty: pode.podeRejectedQty,
        podeStockedQty: pode.podeStockedQty,
        podeModifiedDate: new Date(),
        podeStock: pode.podeStock,
      })
      .then((result) => {
        return {
          message: 'Congrats, you have new purchase order detail',
          result: result,
        };
      })
      .catch((error) => {
        return {
          massage: 'Sorry, something went wrong' + error,
        };
      });
  }

  async editPode(pode: PurchaseOrderDetail): Promise<any> {
    return await this.podeRepository
      .update(
        {
          podeId: pode.podeId,
        },
        {
          podePohe: pode.podePohe,
          podeOrderQty: pode.podeOrderQty,
          podePrice: pode.podePrice,
          podeLineTotal: pode.podeLineTotal,
          podeReceivedQty: pode.podeReceivedQty,
          podeRejectedQty: pode.podeRejectedQty,
          podeStockedQty: pode.podeStockedQty,
          podeModifiedDate: new Date(),
          podeStock: pode.podeStock,
        },
      )
      .then((result) => {
        return {
          message: `Congrats, you're purchase order detail has been changed`,
          result: result,
        };
      })
      .catch((error) => {
        return {
          massage: 'Sorry, something went wrong' + error,
        };
      });
  }

  async dropPode(pode: PurchaseOrderDetail): Promise<any> {
    return await this.podeRepository
      .delete({
        podeId: pode.podeId,
      })
      .then((result) => {
        return {
          message: `Congrats, you're purchase order detail has been deleted`,
          result: result,
        };
      })
      .catch((error) => {
        return {
          massage: 'Sorry, something went wrong' + error,
        };
      });
  }
}
