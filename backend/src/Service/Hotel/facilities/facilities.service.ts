import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/entities/Facilities';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private faciRepository: Repository<Facilities>,
  ) {}

  async findAllFaci(): Promise<any> {
    return await this.faciRepository.find({
      relations: {
        facilityPhoto: true,
        facilityPriceHistory: true,
        faciCagro: true,
      },
    });
  }

  async findByFaciId(faci: Facilities): Promise<any> {
    return await this.faciRepository.findOneBy({
      faciId: faci.faciId,
    });
  }

  async addNewFaci(faci: Facilities): Promise<any> {
    return await this.faciRepository
      .save({
        faciName: faci.faciName,
        faciDescription: faci.faciDescription,
        faciMaxNumber: faci.faciMaxNumber,
        faciMeasureUnit: faci.faciMeasureUnit,
        faciRoomNumber: faci.faciRoomNumber,
        faciEnddate: faci.faciEnddate,
        faciLowPrice: faci.faciLowPrice,
        faciHighPrice: faci.faciHighPrice,
        faciRatePrice: faci.faciRatePrice,
        faciDiscount: faci.faciDiscount,
        faciTaxRate: faci.faciTaxRate,
        faciModifiedDate: faci.faciModifiedDate,
        faciHotel: faci.faciHotel,
        faciCagro: faci.faciCagro,
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

  async UpdateFaci(id: number, faci: Facilities): Promise<any> {
    return await this.faciRepository
      .update(
        {
          faciId: id,
        },
        {
          faciName: faci.faciName,
          faciDescription: faci.faciDescription,
          faciMaxNumber: faci.faciMaxNumber,
          faciMeasureUnit: faci.faciMeasureUnit,
          faciRoomNumber: faci.faciRoomNumber,
          faciEnddate: faci.faciEnddate,
          faciLowPrice: faci.faciLowPrice,
          faciHighPrice: faci.faciHighPrice,
          faciRatePrice: faci.faciRatePrice,
          faciDiscount: faci.faciDiscount,
          faciTaxRate: faci.faciTaxRate,
          faciModifiedDate: faci.faciModifiedDate,
          faciHotel: faci.faciHotel,
          faciCagro: faci.faciCagro,
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

  async deleteFaci(id: Facilities) {
    await this.faciRepository
      .delete({
        faciId: id.faciId,
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
