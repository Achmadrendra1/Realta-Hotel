import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
// import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
// import { UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
// import { diskStorage } from 'multer';
import { diskStorage } from 'multer';
import { UploadConfig } from '../../../Service/Hotel/Middleware/upload.config';
import { FacilityPhotosService } from '../../../Service/Hotel/facility_photos/facility_photos.service';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private FaphoService: FacilityPhotosService) {}

  @Get()
  getFapho() {
    return this.FaphoService.findAllFapho();
  }
  @Get(`:filename`)
  getPhoto(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(filename, {
      root: join('public', 'FacilitiesPhotos'),
    });
  }
  @Get(':id')
  getFaphoId(@Param('id') id) {
    return this.FaphoService.findByFaphoId(id);
  }

  @Put(':id')
  UpdateFapho(@Param('hotelId') hotelId: any, @Body() body: any) {
    return this.FaphoService.UpdateFapho(hotelId, body);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('faphoUrl', 10, {
      storage: diskStorage({
        destination: './public/FacilitiesPhotos',
        filename: UploadConfig.PhotoFilename,
      }),
    }),
  )
  addFapho(@UploadedFiles() file: Express.Multer.File, @Body() body: any) {
    return this.FaphoService.addNewFapho(file, body);
  } 

  @Delete(':id')
  DeleteFapho(@Param('id') id) {
    return this.FaphoService.deleteFapho(id);
  }
}
