import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPhoto } from 'src/entities/StockPhoto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StockPhotoService {
  constructor(
    @InjectRepository(StockPhoto)
    private sphoRepository: Repository<StockPhoto>,
  ) {}

  async findAllStockPhoto(): Promise<any> {
    return await this.sphoRepository.find();
  }

  async findSPhoFilename(stockPhoto: StockPhoto): Promise<any> {
    return await this.sphoRepository.find({
      where: {
        sphoPhotoFilename: Like('%' + stockPhoto.sphoPhotoFilename + '%'),
      },
    });
  }

  async addStockPhoto(stockPhoto: StockPhoto): Promise<any> {
    return await this.sphoRepository
      .save({
        sphoThumbnailFilename: stockPhoto.sphoThumbnailFilename,
        sphoPhotoFilename: stockPhoto.sphoPhotoFilename,
        sphoPrimary: stockPhoto.sphoPrimary,
        sphoUrl: stockPhoto.sphoUrl,
        sphoStock: stockPhoto.sphoStock,
      })
      .then((result) => {
        return {
          message: 'Congrats, you have new Stock photo',
          result: result,
        };
      })
      .catch((error) => {
        return {
          message: 'Sorry, something went wrong' + error,
        };
      });
  }

  async editStockPhoto(stockPhoto: StockPhoto): Promise<any> {
    return await this.sphoRepository
      .update(
        {
          sphoPhotoFilename: stockPhoto.sphoPhotoFilename,
        },
        {
          sphoThumbnailFilename: stockPhoto.sphoThumbnailFilename,
          sphoPhotoFilename: stockPhoto.sphoPhotoFilename,
          sphoPrimary: stockPhoto.sphoPrimary,
          sphoUrl: stockPhoto.sphoUrl,
          sphoStock: stockPhoto.sphoStock,
        },
      )
      .then((result) => {
        return {
          message: `Congrats, you're stock photo has been changed`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }

  async dropStockPhoto(stockPhoto: StockPhoto): Promise<any> {
    return await this.sphoRepository
      .delete({
        sphoPhotoFilename: stockPhoto.sphoPhotoFilename,
      })
      .then((result) => {
        return {
          message: `Congrats, you're stock photo has been deleted`,
          result: result,
        };
      })
      .catch((err) => {
        return 'Sorry, something went wrong' + err;
      });
  }
}
