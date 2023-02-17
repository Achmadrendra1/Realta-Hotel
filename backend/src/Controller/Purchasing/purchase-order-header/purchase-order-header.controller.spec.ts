import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderHeaderController } from './purchase-order-header.controller';

describe('PurchaseOrderHeaderController', () => {
  let controller: PurchaseOrderHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderHeaderController],
    }).compile();

    controller = module.get<PurchaseOrderHeaderController>(PurchaseOrderHeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
