import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrdersController } from './booking_orders.controller';

describe('BookingOrdersController', () => {
  let controller: BookingOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingOrdersController],
    }).compile();

    controller = module.get<BookingOrdersController>(BookingOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
