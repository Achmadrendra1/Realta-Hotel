import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenuDetail } from 'src/entities/OrderMenuDetail';
import { Repository } from 'typeorm';

@Injectable()
export class OrderMenuDetailService {
    constructor(@InjectRepository(OrderMenuDetail) private orderMenuDetailRepository : Repository<OrderMenuDetail>){

    }

    async getAll(){
        return await this.orderMenuDetailRepository.find()
    }

    async addOrderMenuDetail(data:OrderMenuDetail){
        return await this.orderMenuDetailRepository.insert(
            {
                ormePrice: data.ormePrice,
                ormeQty: data.ormeQty,
                ormeSubtotal: data.ormeSubtotal,
                ormeDiscount: data.ormeDiscount,
                omdeOrme: data.omdeOrme,
                omdeReme: data.omdeReme
            }
        )
    }
}
