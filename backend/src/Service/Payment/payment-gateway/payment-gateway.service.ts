import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateway } from 'src/entities/PaymentGateway';
import { Repository } from 'typeorm';
import { EntitysService } from '../entitys/entitys.service';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateway)
    private payRepository: Repository<PaymentGateway>,
    private entityService: EntitysService,
  ) {}

  async getAll() {
    return await this.payRepository.find();
  }

  async getbyId(id: number) {
    return await this.payRepository.find({
      where: {
        pagaEntityId: id,
      },
    });
  }

  async getByCode(pagaCode: string) {
    return await this.payRepository.findOneBy({
      pagaCode: pagaCode,
    });
  }

  async getByName(pagaName: string) {
    return await this.payRepository.findOneBy({
      pagaName: pagaName,
    });
  }

  async createPaga(items: PaymentGateway) {
    try {
      await this.payRepository.query('call payment.InsertPaga($1, $2)', [
        items.pagaCode,
        items.pagaName,
      ]);
      const res = await this.getAll();
      return {
        message: 'Data Fintech Successfully Created',
        result: res,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Fintech Code Or Name Already Exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePaga(id: number, items: PaymentGateway) {
    try {
      await this.payRepository.update(
        {
          pagaEntityId: id,
        },
        {
          pagaEntityId: items.pagaEntityId,
          pagaCode: items.pagaCode,
          pagaName: items.pagaName,
          pagaModifiedDate: new Date(),
        },
      );
      return {
        message: 'Data Fintech Berhasil di Update',
      };
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePaga(id: number) {
    await this.payRepository.delete({
      pagaEntityId: id,
    });
    await this.entityService.deleteEntity(id);

    return 'Data Payment Gateway Berhasil Dihapus';
  }
}
