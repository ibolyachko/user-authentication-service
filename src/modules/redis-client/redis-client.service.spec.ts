import { Test, TestingModule } from '@nestjs/testing';
import * as redisMock from 'redis-mock';

import { getMockRedisClient } from '@/common/testing/getMockRedisClient';

import { RedisClientService } from './redis-client.service';

describe('RedisService', () => {
  let service: RedisClientService;
  let redisClientMock: redisMock.RedisClient;

  beforeEach(async () => {
    redisClientMock = getMockRedisClient();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisClientService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisMock.createClient(),
        },
      ],
    }).compile();

    redisClientMock = module.get('REDIS_CLIENT');
    service = module.get<RedisClientService>(RedisClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
