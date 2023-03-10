import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/entities/Facilities';
import { Repository } from 'typeorm';

@Injectable()
export class ListRestaurantService {
    constructor(@InjectRepository(Facilities) private readonly restoRepository:Repository<Facilities> ){}

    async getListResto(param){  
        const data = await this.restoRepository.query('SELECT * FROM resto.resto_detail($1)',[param.page]);
        const selectcount = await this.restoRepository.query('SELECT * FROM resto.count_resto()')
        const counts = selectcount[0].count_resto;        
        
        const result = {
            data,
            counts
        }
        return result;
    }
}
