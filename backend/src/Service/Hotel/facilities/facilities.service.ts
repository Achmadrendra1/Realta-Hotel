import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/entities/Facilities';
import { FacilityPriceHistory } from 'src/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private faciRepository: Repository<Facilities>,
    @InjectRepository(FacilityPriceHistory)
    private faciHistoryRepository: Repository<FacilityPriceHistory>,
  ) {}

  async findAllFaci(): Promise<any> {
    return await this.faciRepository.find({
      relations: {
        faciHotel: true,
        facilityPhotos: true,
        facilityPriceHistories: true,
        faciCagro: true,
      },
    });
  }

  async findByFaciId(faciId: number): Promise<any> {
    return await this.faciRepository.find({
      where: { faciId },
      relations: {
        faciHotel: true,
        facilityPhotos: true,
        facilityPriceHistories: true,
        faciCagro: true,
      },
    });
  }

  async addNewFaci(faci: any): Promise<any> {
    const date = new Date();
    const result = await this.faciRepository.save({
      faciName: faci.faciName,
      faciDescription: faci.faciDescription,
      faciMaxNumber: faci.faciMaxNumber,
      faciMeasureUnit: faci.faciMeasureUnit,
      faciRoomNumber: faci.faciRoomNumber,
      faciStartdate: date,
      faciEnddate: faci.faciEnddate,
      faciLowPrice: faci.faciLowPrice,
      faciHighPrice: faci.faciHighPrice,
      faciRatePrice: faci.faciRatePrice,
      faciDiscount: faci.faciDiscount,
      faciTaxRate: faci.faciTaxRate,
      faciModifiedDate: date,
      faciHotel: faci.faciHotel,
      faciCagro: faci.faciCagro,
    });
    const id = result.faciId;
    return await this.faciHistoryRepository
      .save({
        faphFaci: { faciId: id },
        faphStartdate: new Date(),
        faphEnddate: result.faciEnddate,
        faphLowPrice: result.faciLowPrice,
        faphHighPrice: result.faciHighPrice,
        faphRatePrice: result.faciRatePrice,
        faphDiscount: result.faciDiscount,
        faphTaxRate: result.faciTaxRate,
        faphModifiedDate: date,
        faphUser: faci.userId,
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

  async UpdateFaci(faciId: number, faci: any): Promise<any> {
    const date = new Date();
    const result = await this.faciRepository.update(faciId, {
      faciName: faci.faciName,
      faciDescription: faci.faciDescription,
      faciMaxNumber: faci.faciMaxNumber,
      faciMeasureUnit: faci.faciMeasureUnit,
      faciRoomNumber: faci.faciRoomNumber,
      faciStartdate: faci.faciStartdate,
      faciEnddate: faci.faciEnddate,
      faciLowPrice: faci.faciLowPrice,
      faciHighPrice: faci.faciHighPrice,
      faciRatePrice: faci.faciRatePrice,
      faciDiscount: faci.faciDiscount,
      faciTaxRate: faci.faciTaxRate,
      faciModifiedDate: faci.faciModifiedDate,
      faciHotel: faci.faciHotel,
      faciCagro: faci.faciCagro,
    });
    return await this.faciHistoryRepository
      .save({
        faphFaci: { faciId: faciId },
        faphStartdate: date,
        faphEnddate: faci.faciEnddate,
        faphLowPrice: faci.faciLowPrice,
        faphHighPrice: faci.faciHighPrice,
        faphRatePrice: faci.faciRatePrice,
        faphDiscount: faci.faciDiscount,
        faphTaxRate: faci.faciTaxRate,
        faphModifiedDate: date,
        faphUser: faci.userId,
      })
      .then((result) => {
        return {
          message: `Facilities successfully updated`,
          result: result,
        };
      })
      .catch((err) => {
        return `Failed to Update Facilities` + err;
      });
  }

  async deleteFaci(id: Facilities) {
    await this.faciRepository
      .delete(id)
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
