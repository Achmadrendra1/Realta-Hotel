import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoMenuPhotos } from 'src/entities/RestoMenuPhotos';
import { Repository } from 'typeorm';
// delete picture
import { unlink } from 'fs/promises';
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
 
    async addMultiplePhoto(files:any, body:any){
        // console.log('files',files);
        console.log('body service multiple', body.rempThumbnailFilename);
        
        
        for(let i=0; i<files.length; i++){
            await this.restoMenuPhotoRepository.insert(
                {
                    rempThumbnailFilename: body.rempThumbnailFilename,
                    rempPhotoFilename: files[i].filename,
                    rempPrimary: body.rempPrimary,
                    rempUrl: files[i].path,
                    rempReme: body.remeId
    
                }
            )
        }
        // files.map(async (photo:any) => {
        //     await this.restoMenuPhotoRepository.insert(
        //         {
        //             rempThumbnailFilename: body.rempThumbnailFilename,
        //             rempPhotoFilename: photo.filename,
        //             rempPrimary: body.rempPrimary,
        //             rempUrl: photo.path,
        //             rempReme: body.remeId
    
        //         }
        //     )
        // })
        
        return 'add successfully'
        // let data = await files;
        // console.log('di service', data);
        // return data;
        
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
                rempUrl: file.path,
                // rempReme: body.remeId
            }
        )
    }


    async deleteMenuPhoto(param){
        const id = Number(param.id);
        // ambil satu data photo untuk di hapus
        const img = await this.restoMenuPhotoRepository.findOne({
            where : {
                rempId:id
            }
        });
        // kalau datanya ada, hapus photonya
        if(img){
            // hapus photo di folder restomenuphotos
            await unlink(img.rempUrl);
            // hapus satu baris row photo (data photo) di db
            await this.restoMenuPhotoRepository.delete(param.id)
        }
    } 
}
