import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoMenus } from 'src/entities/RestoMenus';

import { Repository } from 'typeorm';

@Injectable()
export class RestoMenusService {
  constructor(
    @InjectRepository(RestoMenus)
    private restoMenusRepository: Repository<RestoMenus>,
  ) {}

  async getMenus() {
    return await this.restoMenusRepository.find();
  }

  async addMenus(body: any) {
    const date = new Date();

    return await this.restoMenusRepository.insert({
      // remeFaciId: body.remeFaciId,
      remeName: body.remeName,
      remeDescription: body.remeDescription,
      remePrice: body.remePrice,
      remeStatus: body.remeStatus,
      remeModifiedDate: date,
    });
  }

  async editMenu(param: any, body: any) {
    const date = new Date(); // get date (now)

    return await this.restoMenusRepository.update(
      {
        remeId: param.id,
      },
      {
        remeFaci: body.remeFaci,
        // remeFaciId: body.remeFaciId,
        remeName: body.remeName,
        remeDescription: body.remeDescription,
        remePrice: body.remePrice,
        remeStatus: body.remeStatus,
        remeModifiedDate: date,
      },
    );
  }

  async deleteMenu(param: any) {
    return await this.restoMenusRepository.delete(param.id);
  }
}
