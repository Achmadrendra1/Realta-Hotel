import { Injectable } from '@nestjs/common';
//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Proviences } from 'src/entities/Proviences';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Proviences)
    private proviencesRepository: Repository<Proviences>,
  ) {}

  //find All
  async findAllProviences(): Promise<any> {
    return await this.proviencesRepository.find({
      order: {
        provId: 'ASC',
      },
    });
  }

  //find by Id
  async findOneProviences(provId: number): Promise<any> {
    return await this.proviencesRepository.findOne({
      where: {
        provId: provId,
      },
    });
  }

  //create new
  // async createProviences(data: Proviences): Promise<any> {
  //   return await this.proviencesRepository
  //     .save(data)
  //     .then(() => {
  //       return 'success';
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }
  async createProviences(data: any): Promise<Proviences> {
    const provinces = new Proviences();
    provinces.provName = data.prov_name;
    provinces.provCountry = data.prov_country_id;
    return await this.proviencesRepository.save(provinces);
  }

  //update
  async updateProviences(provId: number, data: any): Promise<Proviences> {
    const provinces = new Proviences();
    provinces.provName = data.prov_name;
    provinces.provCountry = data.prov_country_id;
    return await this.proviencesRepository
      .update({ provId: provId }, provinces)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteProviences(provId: number): Promise<any> {
    return await this.proviencesRepository.delete({ provId: provId });
  }
}
