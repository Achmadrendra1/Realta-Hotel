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
        return await this.proviencesRepository.find();
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
      async createProviences(data: Proviences): Promise<any> {
        return await this.proviencesRepository
          .save(data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //update
      async updateProviences(provId: number, data: Proviences): Promise<any> {
        return await this.proviencesRepository
          .update({ provId: provId }, data)
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
    
      //delete
      async deleteProviences(provId: number): Promise<any> {
        return await this.proviencesRepository
          .delete({ provId: provId })
          .then(() => {
            return 'success';
          })
          .catch((error) => {
            return error;
          });
      }
}
