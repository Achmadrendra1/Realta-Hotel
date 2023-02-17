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
    return await this.FaphoRepsitory.find();
  }

  async findByFaphoId(fapho: FacilityPhoto): Promise<any> {
    return await this.FaphoRepsitory.findOneBy({
      faphoId: fapho.faphoId,
    });
  }

  async addNewFapho(fapho: FacilityPhoto): Promise<any> {
    return await this.FaphoRepsitory.save({
      faphoFaciId: fapho.faphoFaciId,
      faphoThumbnailFilename: fapho.faphoThumbnailFilename,
      faphoPhotoFilename: fapho.faphoPhotoFilename,
      faphoPrimary: fapho.faphoPrimary,
      faphoUrl: fapho.faphoUrl,
      faphoModifiedDate: fapho.faphoModifiedDate,
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
        faphoFaciId: fapho.faphoFaciId,
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
