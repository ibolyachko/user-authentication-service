import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(createUserDto: RegisterUserDto) {
    const createUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(createUser);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
