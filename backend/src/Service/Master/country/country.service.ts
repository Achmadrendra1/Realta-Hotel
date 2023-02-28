import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from 'src/entities/Country';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  //find All
  async findAllCountry(): Promise<any> {
    return await this.countryRepository.query(
      'select * from master.country order by country_id',
    );
  }

  //find by Id
  async findOneCountry(countryId: number): Promise<any> {
    return await this.countryRepository.findOne({
      where: {
        countryId: countryId,
      },
    });
  }

  //create new
  async createCountry(data: any): Promise<Country> {
    const country = new Country();
    country.countryName = data.country_name;
    country.countryRegion = data.country_region_id;
    return await this.countryRepository.save(country);
  }

  //update
  async updateCountry(countryId: number, data: any): Promise<Country> {
    const country = new Country();
    country.countryName = data.country_name;
    country.countryRegion = data.country_region_id;

    return await this.countryRepository
      .update({ countryId: countryId }, country)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteCountry(countryId: number): Promise<any> {
    return await this.countryRepository.delete({ countryId: countryId });
    // .then(() => {
    //   return 'success';
    // })
    // .catch((error) => {
    //   return error;
    // });
  }
}
