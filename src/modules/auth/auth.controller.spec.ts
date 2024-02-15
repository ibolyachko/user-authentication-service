import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as redisMock from 'redis-mock';

import { getMockRepository } from '@/common/testing/getMockRepository';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtTokenService } from '@/modules/jwt-token/jwt-token.service';
import { RedisClientService } from '@/modules/redis-client/redis-client.service';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        JwtTokenService,
        UserService,
        RedisClientService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisMock.createClient(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: getMockRepository(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
