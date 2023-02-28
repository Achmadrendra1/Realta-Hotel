import { Test, TestingModule } from '@nestjs/testing';
import { StodController } from './stock-detail.controller';

describe('StodController', () => {
  let controller: StodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StodController],
    }).compile();

    controller = module.get<StodController>(StodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
