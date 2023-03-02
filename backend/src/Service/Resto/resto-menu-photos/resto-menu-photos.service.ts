import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoMenuPhotos } from 'src/entities/RestoMenuPhotos';
import { Repository } from 'typeorm';

@Injectable()
export class RestoMenuPhotosService {
    constructor(@InjectRepository(RestoMenuPhotos) private restoMenuPhotoRepository:Repository<RestoMenuPhotos>){}

    async getMenuPhotos(){
        return await this.restoMenuPhotoRepository.query('SELECT * FROM resto.resto_menu_photos');
    }

    async getListPhoto(param:any){
        const id = Number(param.id)
        // console.warn(typeof id, 'type param id');

        return await this.restoMenuPhotoRepository.query(
            `SELECT * FROM resto.getPhotoMenu(${id})`
        )
    }

    async addMenuPhoto(file:any, body:any){
        // console.log(file, 'ini file service');
        return await this.restoMenuPhotoRepository.insert(
            {
                rempThumbnailFilename: body.rempThumbnailFilename,
                rempPhotoFilename: file.filename,
                rempPrimary: body.rempPrimary,
                rempUrl: file.path,
                rempReme: body.remeId

            }
        )
    }

            
    async editPrimary(data:any){
        // console.log('body di serice', data);
        
        data.map(async (row:any)=>{
            await this.restoMenuPhotoRepository.update(
                {
                    rempId: row.rempid
                },
                {
                    rempPrimary: row.rempprimary
                }
            )
        })
        return 'UPDATED SUCCESSFULLY'
    }

    
    async editMenuPhoto(file:any, body:any, param:any){
        return await this.restoMenuPhotoRepository.update(
            {
                rempId: param.id
            },
            {
                // rempThumbnailFilename: body.rempThumbnailFilename,
                rempPhotoFilename: file.filename,
                rempPrimary: body.rempPrimary,
                rempUrl: file.path ,
                // rempReme: body.remeId
            }
        )
    }


    async deleteMenuPhoto(param){
        return await this.restoMenuPhotoRepository.delete(param.id)
    }
}
