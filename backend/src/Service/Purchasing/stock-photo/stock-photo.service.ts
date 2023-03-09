import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StockPhoto } from 'src/entities/StockPhoto';

@Injectable()
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
    )
  }

  async findSphoName(stockPhoto: StockPhoto): Promise<any> {
    return await this.sphoRepository.find(
      { where: { sphoPhotoFilename: Like('%' + stockPhoto.sphoPhotoFilename + '%') } }
    )
  }

  async addSpho(url: any, stockPhoto: StockPhoto): Promise<any> {
    for (const data of url) {
      await this.sphoRepository.save(
        {
          sphoThumbnailFilename: data.originalname,
          sphoPhotoFilename: data.filename,
          sphoPrimary: stockPhoto.sphoPrimary,
          sphoUrl: data.filename,
          sphoStock: stockPhoto.sphoStock
        }
      )
      const res = await this.findAllSpho()
      return (
        { message: `Congrats, you have new Stock photo`, result: res }
      )
    }

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
        sphoStock: spho.sphoStock
      })
      return { message: `Congrats, you're stock photo has been changed` }
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
}