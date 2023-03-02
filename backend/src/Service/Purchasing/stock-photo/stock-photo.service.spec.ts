import { Test, TestingModule } from '@nestjs/testing';
import { SphoService } from './stock-photo.service';

describe('SphoService', () => {
  let service: SphoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SphoService],
    }).compile();

    service = module.get<SphoService>(SphoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
