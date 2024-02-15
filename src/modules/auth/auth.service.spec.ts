import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as redisMock from 'redis-mock';

import { getMockRepository } from '@/common/testing/getMockRepository';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { JwtTokenService } from '@/modules/jwt-token/jwt-token.service';
import { RedisClientService } from '@/modules/redis-client/redis-client.service';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockRepositoryToken = getRepositoryToken(User);
  const mockUserRepository = getMockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        AuthService,
        UserService,
        JwtTokenService,
        RedisClientService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisMock.createClient(),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: mockRepositoryToken,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return its data', async () => {
    const registerUserDto = {
      fullName: 'John Doe',
      email: 'john@email.com',
      username: 'johndoe',
      password: 'john123',
    } as RegisterUserDto;

    const user = {
      id: Date.now().toString(),
      fullName: 'John Doe',
      email: 'john@email.com',
      username: 'johndoe',
      password: 'john123',
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.registerUser(registerUserDto);

    expect(mockUserRepository.create).toBeCalled();
    expect(mockUserRepository.save).toBeCalled();

    expect(result).toEqual(user);
  });

  it('should login user and return access token', async () => {
    const loginUserDto = {
      email: 'john@email.com',
      password: 'john123',
    } as LoginUserDto;

    const user = {
      id: Date.now().toString(),
      fullName: 'John Doe',
      email: 'john@email.com',
      username: 'johndoe',
      password: 'john123',
    } as User;

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

    const result = await service.loginUser(loginUserDto);

    expect(mockUserRepository.save).toBeCalled();

    expect(result).toEqual({ accessToken: undefined });
  });
});
