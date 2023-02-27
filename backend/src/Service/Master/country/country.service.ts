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
    return await this.countryRepository.find();
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
  async createCountry(data: Country): Promise<any> {
    return await this.countryRepository.save(data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //update
  async updateCountry(countryId: number, data: Country): Promise<any> {
    return await this.countryRepository.update({ countryId: countryId }, data)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteCountry(countryId: number): Promise<any> {
    return await this.countryRepository.delete({ countryId: countryId })
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }
}
