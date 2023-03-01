import { Test, TestingModule } from '@nestjs/testing';
import { ListRestaurantService } from './list-restaurant.service';

describe('ListRestaurantService', () => {
  let service: ListRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListRestaurantService],
    }).compile();

    service = module.get<ListRestaurantService>(ListRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
