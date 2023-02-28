import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityPriceHistory } from 'src/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectRepository(FacilityPriceHistory)
    private faphRepository: Repository<FacilityPriceHistory>,
  ) {}
  async findAllFaph(): Promise<any> {
    return await this.faphRepository.find({
      relations: {
        faphFaci: true,
        faphUser: true,
      },
    });
  }

  async findByFaphId(faph: FacilityPriceHistory): Promise<any> {
    return await this.faphRepository.findOneBy({
      faphId: faph.faphId,
    });
  }

  async addNewFaph(faph: FacilityPriceHistory): Promise<any> {
    return await this.faphRepository
      .save({
        faphFaci: faph.faphFaci,
        faphStartdate: faph.faphStartdate,
        faphEnddate: faph.faphEnddate,
        faphLowPrice: faph.faphLowPrice,
        faphHighPrice: faph.faphHighPrice,
        faphRatePrice: faph.faphRatePrice,
        faphDiscount: faph.faphDiscount,
        faphTaxRate: faph.faphTaxRate,
        faphModifiedDate: faph.faphModifiedDate,
        faphUser: faph.faphUser,
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

  async UpdateFaph(id: number, faph: FacilityPriceHistory): Promise<any> {
    return await this.faphRepository
      .update(
        {
          faphId: id,
        },
        {
          faphFaci: faph.faphFaci,
          faphStartdate: faph.faphStartdate,
          faphEnddate: faph.faphEnddate,
          faphLowPrice: faph.faphLowPrice,
          faphHighPrice: faph.faphHighPrice,
          faphRatePrice: faph.faphRatePrice,
          faphDiscount: faph.faphDiscount,
          faphTaxRate: faph.faphTaxRate,
          faphModifiedDate: faph.faphModifiedDate,
          faphUser: faph.faphUser,
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

  async deleteFaph(id: FacilityPriceHistory) {
    await this.faphRepository
      .delete({
        faphId: id.faphId,
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
