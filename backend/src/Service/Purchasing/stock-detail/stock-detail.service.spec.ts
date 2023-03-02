import { Test, TestingModule } from '@nestjs/testing';
import { StodService } from './stock-detail.service';

describe('StodService', () => {
  let service: StodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StodService],
    }).compile();

    service = module.get<StodService>(StodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
