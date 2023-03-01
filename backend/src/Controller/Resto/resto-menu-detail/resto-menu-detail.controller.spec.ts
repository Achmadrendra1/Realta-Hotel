import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenuDetailController } from './resto-menu-detail.controller';

describe('RestoMenuDetailController', () => {
  let controller: RestoMenuDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoMenuDetailController],
    }).compile();

    controller = module.get<RestoMenuDetailController>(RestoMenuDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
