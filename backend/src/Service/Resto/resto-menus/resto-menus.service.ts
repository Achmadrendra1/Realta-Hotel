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
        // return await this.restoMenusRepository.query('SELECT * FROM resto.restomenu_dashboard')
        return await this.restoMenusRepository.find();
    }
 
    async getMenuByFacility(Param:any){
        return await this.restoMenusRepository.query(`SELECT * FROM resto.listMenu(${Param.id})`)
    } 
    
    async getMenuForUser(Param:any, body:any){ 
        // ubah search yg diinput ke lowercase
        const searchLower = body.search.toLowerCase()
        // get 9 data menu
        const data = await this.restoMenusRepository.query(
            'SELECT * FROM resto.listMenuUser($1, $2, $3, $4)',[Param.id, searchLower, body.currentpage, body.sortedData]
        )
        // get count
        const selectcount = await this.restoMenusRepository.query(
            'SELECT * FROM resto.count_menu($1, $2)',[Param.id, searchLower])
        const counts = selectcount[0].count_menu;
        // console.log(counts);
        
        const result = {
            data,
            counts
        }
        return result;
    }

    async getMenuForAdmin(body){
        const searchLower = body.search.toLowerCase()
        const data = await this.restoMenusRepository.query(
            'SELECT * FROM resto.restomenu_dashboard($1, $2)', [searchLower, body.currentpage]
        )
        const selectcount = await this.restoMenusRepository.query(
            'SELECT * FROM resto.count_menu_dashboard($1)',[searchLower]
        )
        const counts = selectcount[0].count_menu_dashboard;

        const result = {
            data,
            counts
        }

        return result;
    }

    async getMenu(param:any){
        const remeid = Number(param.id)
        return await this.restoMenusRepository.query('SELECT * FROM resto.resto_menus WHERE reme_id = ($1)',[remeid])
        // return await this.restoMenusRepository.findOne(
        //     {
        //         where : { remeId: remeid}
        //     }
        // );
    }

    // async getFacility(){
    //     return await this.facilityRepository.query('SELECT * FROM resto.faci_resto')
    // }

    async addMenus(body:any){
        // console.log('sampe addmenu', body);
         
        // const now:Date = new Date();
        // const dateForPostgre: string = now.toISOString();
        const dateForPostgre = new Date()
        
        return await this.restoMenusRepository.insert(
            {
                remeFaci: body.remeFaciId,
                remeName: body.remeName,
                remeDescription: body.remeDescription,
                remePrice: body.remePrice,
                remeStatus: body.remeStatus,
                remeModifiedDate: dateForPostgre
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
