import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getMockRepository } from '@/common/testing/getMockRepository';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';

describe('UserService', () => {
  let service: UserService;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: getMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return undefined if user does not exist', async () => {
    const userEmail = 'test@mail.com';

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    const result = await userService.getUserByEmail(userEmail);

    expect(result).toBe(undefined);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: {
        email: userEmail,
      },
    });
  });

  it('should return object if user exists', async () => {
    const userEmail = 'tes@mail.com';
    const existingUser = { id: 1, email: userEmail } as unknown as User;

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(existingUser);

    const result = await userService.getUserByEmail(userEmail);

    expect(result).toBe(existingUser);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: {
        email: userEmail,
      },
    });
  });
});
