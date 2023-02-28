import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StockPhoto } from 'src/entities/StockPhoto';

@Injectable()
<<<<<<< HEAD
export class SphoService {
    constructor(
        @InjectRepository(StockPhoto)
        private sphoRepository: Repository<StockPhoto>
    ) { }

    async findAllSpho(): Promise<any> {
        return await this.sphoRepository.find()
    }

    async findSphoId(id: number): Promise<any> {
        return await this.sphoRepository.find(
            { where: { sphoId: id } }
        );
    }

    async findSphoName(stockPhoto: StockPhoto): Promise<any> {
        return await this.sphoRepository.find(
            { where: { sphoPhotoFilename: Like('%' + stockPhoto.sphoPhotoFilename + '%') } }
        );
    }

    async addSpho(stockPhoto: StockPhoto): Promise<any> {
        await this.sphoRepository.save(
            {
                sphoThumbnailFilename: stockPhoto.sphoThumbnailFilename,
                sphoPhotoFilename: stockPhoto.sphoPhotoFilename,
                sphoPrimary: stockPhoto.sphoPrimary,
                sphoUrl: stockPhoto.sphoUrl,
                sphoStock: stockPhoto.sphoStock,
            }
        )
        const res = await this.findAllSpho()
        return (
            { message: `Congrats, you have new Stock photo`, result: res }
        )
    }

    async editSpho(id: number, spho: StockPhoto): Promise<any> {
        try {
            await this.sphoRepository.update({
                sphoId: id
            }, {
                sphoThumbnailFilename: spho.sphoThumbnailFilename,
                sphoPhotoFilename: spho.sphoPhotoFilename,
                sphoPrimary: spho.sphoPrimary,
                sphoUrl: spho.sphoUrl,
                sphoStock: spho.sphoStock,
            })
            return { message: `Congrats, you're stock photo has been changed` };
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async dropSpho(id: number): Promise<any> {
        await this.sphoRepository.delete(
            { sphoId: id }
        )
        return `Congrats, you're stock photo has been deleted`
    }
=======
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
>>>>>>> 6c2deb00bcb595d858c523cf3b8982f0d1717d0f
}
