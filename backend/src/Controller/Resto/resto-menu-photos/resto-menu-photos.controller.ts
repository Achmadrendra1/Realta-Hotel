import { Body, Controller, Get, Post, Put, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RestoMenuPhotosService } from 'src/Service/Resto/resto-menu-photos/resto-menu-photos.service';
// import { diskStorage } from 'multer';
import { diskStorage } from 'multer'
import { Helper } from './Helper';
import { Delete, Param } from '@nestjs/common/decorators';

@Controller('resto-menu-photos')
export class RestoMenuPhotosController {
    constructor(private readonly restoMenuPhotos:RestoMenuPhotosService){}

    // get all data
    @Get()
    getMenuPhoto(){
        return this.restoMenuPhotos.getMenuPhotos();    
    }

    @Get(':id')
    getListPhoto(@Param() param){
        // console.warn('ini param', param);
        
        return this.restoMenuPhotos.getListPhoto(param)
    }
 
    // add data
    @Post()
    @UseInterceptors(FileInterceptor('rempUrl', {
        storage:diskStorage({
            destination: Helper.storage,
            filename: Helper.customFileName
        })
    }))
    addMenuPhoto(@UploadedFile() file: Express.Multer.File, @Body() body){
        // console.log('ini file di controller: ', file)
        return this.restoMenuPhotos.addMenuPhoto(file,body);
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('rempUrl',10,{
        storage:diskStorage({
            destination: Helper.storage,
            filename: Helper.customFileName
        })
    }))
    addMultiplePhoto(@UploadedFiles() rempUrl: Array<Express.Multer.File>, @Body() body){
        return this.restoMenuPhotos.addMultiplePhoto(rempUrl,body)
        
    }
 
  
    @Put('/primary')
    editPrimary(@Body() body){
        // return body;
        // console.log(body,'body di controller');
        
        return this.restoMenuPhotos.editPrimary(body);
    }

    // // update/edit data
    // @Put(':id')
    // @UseInterceptors(FileInterceptor('rempUrl', {
    //     storage:diskStorage({
    //         destination: Helper.storage,
    //         filename: Helper.customFileName
    //     })
    // }))
    // editMenuPhoto(@UploadedFile() file: Express.Multer.File, @Body() body, @Param() Param){
    //     return this.restoMenuPhotos.editMenuPhoto(file,body, Param);
    // }


 
    // delete
    @Delete(':id')
    deleteMenuPhoto(@Param() param){
        return this.restoMenuPhotos.deleteMenuPhoto(param)
    }
 
}


