import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoMenus } from 'src/entities/RestoMenus';
import { Repository } from 'typeorm';

@Injectable()
export class RestoMenuDetailService {
    constructor(@InjectRepository(RestoMenus) private restoMenuRepo: Repository<RestoMenus>){}

    async getAll(){
        return this.restoMenuRepo.query( 'SELECT * FROM resto.resto_menu_detail')
    }
}
