import { Test, TestingModule } from '@nestjs/testing';
import { ListRestaurantController } from './list-restaurant.controller';

describe('ListRestaurantController', () => {
  let controller: ListRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListRestaurantController],
    }).compile();

    controller = module.get<ListRestaurantController>(ListRestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
