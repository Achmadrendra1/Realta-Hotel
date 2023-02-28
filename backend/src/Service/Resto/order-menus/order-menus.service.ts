import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenus } from 'src/entities/OrderMenus';
import { Repository } from 'typeorm';

@Injectable()
export class OrderMenusService {
  constructor(
    @InjectRepository(OrderMenus)
    private orderMenuRepository: Repository<OrderMenus>,
  ) {}

  async getOrderMenus() {
    return await this.orderMenuRepository.find();
  }

  async editOrderMenu(param: any, body: any) {
    const date = new Date();
    return await this.orderMenuRepository.update(
      {
        ormeId: param.id,
      },
      {
        ormeOrderNumber: body.ormeOrderNumber,
        ormeOrderDate: date,
        ormeTotalItem: body.ormeTotalItem,
        ormeTotalDiscount: body.ormeTotalDiscount,
        ormeTotalAmount: body.ormeTotalAmount,
        ormePayType: body.ormePayType,
        ormeCardnumber: body.ormeCardnumber,
        ormeIsPaid: body.ormeIsPaid,
        ormeModifiedDate: date,
        ormeUser: body.ormeUser,
      },
    );
  }
}
