import { Test, TestingModule } from '@nestjs/testing';
import { VeproService } from './vendor-product.service';

describe('VeproService', () => {
  let service: VeproService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeproService],
    }).compile();

    service = module.get<VeproService>(VeproService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
