import { Test, TestingModule } from '@nestjs/testing';
import { UserBreakfeastController } from './user-breakfeast.controller';

describe('UserBreakfeastController', () => {
  let controller: UserBreakfeastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBreakfeastController],
    }).compile();

    controller = module.get<UserBreakfeastController>(UserBreakfeastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
