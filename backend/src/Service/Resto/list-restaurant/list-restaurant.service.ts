import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/entities/Facilities';
import { Repository } from 'typeorm';

@Injectable()
export class ListRestaurantService {
    constructor(@InjectRepository(Facilities) private readonly restoRepository:Repository<Facilities> ){}

    async getListResto(){
        return await this.restoRepository.query('SELECT * FROM resto.resto_detail');
    }
}
