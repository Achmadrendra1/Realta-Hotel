import { Injectable } from '@nestjs/common';

//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Regions } from 'src/entities/Regions';
import { Country } from 'src/entities/Country';
import { Proviences } from 'src/entities/Proviences';
import { Address } from 'src/entities/Address';

interface dataLocations {
  regionCode: any;
  regionName: any;
  countryId: any;
  countryName: any;
  countryRegion: any; // one-to-many { country_region_id -> regionCode }
  provId: any;
  provName: any;
  addresses: any; //one-to-many
  provCountry: any; //many-to-one { prov_country_id -> countryId }
  addrId: any;
  addrLine1: any;
  addrLine2: any;
  addrPostalCode: any;
  addrSpatialLocation: any;
  addrProv: any; // many-to-one { addr_prov_id -> provId }
  hotels: any; // one-to many
  userProfiles: any; //one-to-many
}

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private regionsRepository: Repository<Regions>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Proviences)
    private provincesRepository: Repository<Proviences>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  //Find All Location
  async getLocation() {
    return await this.regionsRepository.query(
      'select * from master.locationsAll() order by addr_id',
    );
  }

  async getLocationRC() {
    return await this.regionsRepository.query(
      'select * from master.locationsRC() order by country_id',
    );
  }
  async getLocationRCP() {
    return await this.regionsRepository.query(
      'select * from master.locationsRCP() order by prov_id',
    );
  }

  //create new Location
  async createRC(data: dataLocations) {
    await this.regionsRepository.save(this.regionsRepository.create(data));
    await this.countryRepository.save(this.countryRepository.create(data));
  }
  async createRCP(data: dataLocations) {
    await this.regionsRepository.save(this.regionsRepository.create(data));
    await this.countryRepository.save(this.countryRepository.create(data));
    await this.provincesRepository.save(this.provincesRepository.create(data));
  }
  async createRCPA(data: dataLocations) {
    await this.regionsRepository.save(this.regionsRepository.create(data));
    await this.countryRepository.save(this.countryRepository.create(data));
    await this.provincesRepository.save(this.provincesRepository.create(data));
    await this.addressRepository.save(this.addressRepository.create(data));
  }

  //find All
  async findAllRegions(): Promise<any> {
    return await this.regionsRepository.query(
      'select * from master.regions order by region_code',
    );
  }

  //find by Id
  async findOneRegions(regionCode: number): Promise<any> {
    return await this.regionsRepository.findOne({
      where: {
        regionCode: regionCode,
      },
    });
  }

  //create new
  async createRegions(data: Regions): Promise<Regions> {
    
    return await 
      this.regionsRepository.save(data)
    ;
  }

  //update
  async updateRegions(regionCode: number, data: any): Promise<Regions> {
    const regions = new Regions();
    regions.regionName = data.region_name;
    return await this.regionsRepository
      .update({ regionCode: regionCode }, regions)
      .then(() => {
        return 'success';
      })
      .catch((error) => {
        return error;
      });
  }

  //delete
  async deleteRegions(regionCode: number): Promise<any> {
    return await this.regionsRepository.delete({ regionCode: regionCode });
    // .then(() => {
    //   return 'success';
    // })
    // .catch((error) => {
    //   return error;
    // });
  }
}
