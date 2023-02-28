import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoMenuPhotos } from 'src/entities/RestoMenuPhotos';
import { Repository } from 'typeorm';

@Injectable()
export class RestoMenuPhotosService {
  constructor(
    @InjectRepository(RestoMenuPhotos)
    private restoMenuPhotoRepository: Repository<RestoMenuPhotos>,
  ) {}

  async getMenuPhotos() {
    return await this.restoMenuPhotoRepository.find();
  }

  async addMenuPhoto(file: any, body: any) {
    return await this.restoMenuPhotoRepository.insert({
      rempThumbnailFilename: body.rempThumbnailFilename,
      rempPhotoFilename: body.rempPhotoFilename,
      rempPrimary: body.rempPrimary,
      rempUrl: file.path,
    });
  }

  async editMenuPhoto(file: any, body: any, param: any) {
    return await this.restoMenuPhotoRepository.update(
      {
        rempId: param.id,
      },
      {
        rempThumbnailFilename: body.rempThumbnailFilename,
        rempPhotoFilename: body.rempPhotoFilename,
        rempPrimary: body.rempPrimary,
        rempUrl: file.path,
      },
    );
  }

  async deleteMenuPhoto(param) {
    return await this.restoMenuPhotoRepository.delete(param.id);
  }
}
