import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityPhoto } from 'src/entities/FacilityPhoto';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityPhotosService {
  constructor(
    @InjectRepository(FacilityPhoto)
    private FaphoRepsitory: Repository<FacilityPhoto>,
  ) {}

  async findAllFapho(): Promise<any> {
    return await this.FaphoRepsitory.find({
      relations: {
        faphoFaci: true,
      },
    });
  }

  async findByFaphoId(id: any): Promise<any> {
    return await this.FaphoRepsitory.find({
      relations: {
        faphoFaci: true,
      },
      where: { faphoFaci: { faciId: id } },
    });
  }

  // async addNewFapho(file, fapho: FacilityPhoto): Promise<any> {
  //   return await this.FaphoRepsitory.save({
  //     faphoFaciId: fapho.faphoFaciId,
  //     faphoThumbnailFilename: fapho.faphoThumbnailFilename,
  //     faphoPhotoFilename: fapho.faphoPhotoFilename,
  //     faphoPrimary: fapho.faphoPrimary,
  //     // faphoUrl: file ? file[0].originalname : null,
  //     faphoUrl: file,
  //     faphoModifiedDate: fapho.faphoModifiedDate,
  //   })
  //     .then((result) => {
  //       return {
  //         message: `Facilities successfuly added to the system`,
  //         result: result,
  //       };
  //     })
  //     .catch((error) => {
  //       return `facilities failed adding to the system` + error;
  //     });
  // }

  async addNewFapho(file, fapho: any) {
    console.log(file);
    const id = fapho.faphoFaci;
    for (const data of file) {
      await this.FaphoRepsitory.save({
        faphoFaci: fapho.faphoFaci,
        faphoThumbnailFilename: data.originalname,
        faphoPhotoFilename: data.filename,
        faphoPrimary: fapho.faphoPrimary,
        faphoUrl: data.path,
        // faphoUrl: file.path,
        faphoModifiedDate: fapho.faphoModifiedDate,
      });
    }
    return await this.FaphoRepsitory.find({
      where: { faphoFaci: { faciId: id } },
    })
      .then((result) => {
        return {
          message: `Facilities successfuly added to the system`,
          result: result,
        };
      })
      .catch((error) => {
        return `facilities failed adding to the system` + error;
      });
  }

  async UpdateFapho(id: number, fapho: FacilityPhoto): Promise<any> {
    return await this.FaphoRepsitory.update(
      {
        faphoId: id,
      },
      {
        faphoFaci: fapho.faphoFaci,
        faphoThumbnailFilename: fapho.faphoThumbnailFilename,
        faphoPhotoFilename: fapho.faphoPhotoFilename,
        faphoPrimary: fapho.faphoPrimary,
        faphoUrl: fapho.faphoUrl,
        faphoModifiedDate: fapho.faphoModifiedDate,
      },
    )
      .then((result) => {
        return {
          message: `Facilities successfully updated`,
          result: result,
        };
      })
      .catch((err) => {
        return `Failed to Update Facilities`;
      });
  }

  async deleteFapho(id: FacilityPhoto) {
    await this.FaphoRepsitory.delete({
      faphoId: id.faphoId,
    })
      .then((result) => {
        return {
          message: `Facilities successfully deleted`,
          result: result,
        };
      })
      .catch((error) => {
        return `Failed to Delete` + error;
      });
  }
}
