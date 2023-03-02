import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenuDetailService } from './resto-menu-detail.service';

describe('RestoMenuDetailService', () => {
  let service: RestoMenuDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestoMenuDetailService],
    }).compile();

    service = module.get<RestoMenuDetailService>(RestoMenuDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
