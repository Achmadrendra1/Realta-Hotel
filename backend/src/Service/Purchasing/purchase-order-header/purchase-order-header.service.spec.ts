import { Test, TestingModule } from '@nestjs/testing';
import { PoheService } from './purchase-order-header.service';

describe('PoheService', () => {
  let service: PoheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoheService],
    }).compile();

    service = module.get<PoheService>(PoheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
