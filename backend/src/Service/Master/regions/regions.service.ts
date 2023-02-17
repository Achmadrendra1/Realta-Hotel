import { Injectable } from '@nestjs/common';

//
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Regions } from 'src/entities/Regions';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions)
        private regionsRepository: Repository<Regions>,
      ) {}
    
      //find All
      async findAllRegions(): Promise<any> {
        return await this.regionsRepository.find();
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
      async createRegions(data: Regions): Promise<any> {
        return await this.regionsRepository
          .save(data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //update
      async updateRegions(regionCode: number, data: Regions): Promise<any> {
        return await this.regionsRepository
          .update({ regionCode: regionCode }, data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //delete
      async deleteRegions(regionCode: number): Promise<any> {
        return await this.regionsRepository
          .delete({ regionCode: regionCode })
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
}
