import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/entities/Facilities';
import { RestoMenus } from 'src/entities/RestoMenus';
import { Repository } from 'typeorm';

@Injectable()
export class RestoMenusService {
    constructor(
        @InjectRepository(RestoMenus) private restoMenusRepository:Repository<RestoMenus>
        ){}

    async getMenus(){
        return await this.restoMenusRepository.query('SELECT * FROM resto.restomenu_dashboard')
        // return await this.restoMenusRepository.find();
    }
 
    async getMenuByFacility(Param:any){
        return await this.restoMenusRepository.query(`SELECT * FROM resto.listMenu(${Param.id})`)
    } 
    
    async getMenu(param:any){
        const remeid = Number(param.id)
        return await this.restoMenusRepository.findOne(
            {
                where : { remeId: remeid}
            }
        );
    }

    // async getFacility(){
    //     return await this.facilityRepository.query('SELECT * FROM resto.faci_resto')
    // }

    async addMenus(body:any){
        // console.log('sampe addmenu', body);
         
        const date = new Date();
        
        return await this.restoMenusRepository.insert(
            {
                remeFaci: body.remeFaciId,
                remeName: body.remeName,
                remeDescription: body.remeDescription,
                remePrice: body.remePrice,
                remeStatus: body.remeStatus,
                remeModifiedDate: date
            }
        )
    }

    async editMenu(param:any, body:any){
        const date = new Date();    // get date (now)
        
        return await this.restoMenusRepository.update(
            {
                remeId: param.id
            },
            {
                remeFaci: body.remeFaciId,
                remeName: body.remeName,
                remeDescription: body.remeDescription,
                remePrice: body.remePrice,
                remeStatus: body.remeStatus,
                remeModifiedDate: date
            }
        )
    }

    async deleteMenu(param:any){        
        return await this.restoMenusRepository.delete(param.id);
    }
}
