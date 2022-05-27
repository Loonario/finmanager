import { Test, TestingModule } from '@nestjs/testing';
import { Stats } from './stats';

describe('Stats', () => {
  let provider: Stats;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Stats],
    }).compile();

    provider = module.get<Stats>(Stats);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
