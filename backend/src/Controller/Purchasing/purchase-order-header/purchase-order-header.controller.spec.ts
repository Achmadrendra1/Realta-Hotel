import { Test, TestingModule } from '@nestjs/testing';
import { PoheController } from './purchase-order-header.controller';

describe('PoheController', () => {
  let controller: PoheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoheController],
    }).compile();

    controller = module.get<PoheController>(PoheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
