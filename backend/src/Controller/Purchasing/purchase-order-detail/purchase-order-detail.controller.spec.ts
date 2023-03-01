import { Test, TestingModule } from '@nestjs/testing';
import { PodeController } from './purchase-order-detail.controller';

describe('PodeController', () => {
  let controller: PodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodeController],
    }).compile();

    controller = module.get<PodeController>(PodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
