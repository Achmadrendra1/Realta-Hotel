import { Test, TestingModule } from '@nestjs/testing';
import { VeproController } from './vendor-product.controller';

describe('VeproController', () => {
  let controller: VeproController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeproController],
    }).compile();

    controller = module.get<VeproController>(VeproController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
