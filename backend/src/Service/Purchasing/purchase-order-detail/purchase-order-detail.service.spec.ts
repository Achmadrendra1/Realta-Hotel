import { Test, TestingModule } from '@nestjs/testing';
import { PodeService } from './purchase-order-detail.service';

describe('PodeService', () => {
  let service: PodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodeService],
    }).compile();

    service = module.get<PodeService>(PodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
