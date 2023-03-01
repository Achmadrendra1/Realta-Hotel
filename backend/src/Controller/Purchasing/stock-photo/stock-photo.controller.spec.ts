import { Test, TestingModule } from '@nestjs/testing';
import { SphoController } from './stock-photo.controller';

describe('SphoController', () => {
  let controller: SphoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SphoController],
    }).compile();

    controller = module.get<SphoController>(SphoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
