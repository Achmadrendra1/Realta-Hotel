import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entitys } from 'src/entities/Entitys';
import { Repository } from 'typeorm';

@Injectable()
export class EntitysService {
    constructor(@InjectRepository(Entitys)
    private entityRepository: Repository<Entitys>){}

    async getAll(){
        return await this.entityRepository.find()
    }

    async getOne(){
        return await this.entityRepository.find({
            order: {entityId: "DESC"},
            take: 1 
        })
    }

    async createEntity(){     
        return await this.entityRepository.save({}) 
    }

    async deleteEntity(id:number){
        return await this.entityRepository.delete({
            entityId : id
        }) 
    }


}
