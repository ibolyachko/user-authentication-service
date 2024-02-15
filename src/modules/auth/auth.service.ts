import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { validatePassword } from '@/common/utils/validatePassword';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { JwtTokenService } from '@/modules/jwt-token/jwt-token.service';
import { RedisClientService } from '@/modules/redis-client/redis-client.service';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly redisClientService: RedisClientService,
  ) {}

  async registerUser(createUserDto: RegisterUserDto) {
    const currentUser = await this.userService.getUserByEmail(createUserDto.email);

    if (currentUser) {
      throw new BadRequestException('User is exist');
    }

    return this.userService.createUser(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const currentUser = await this.userService.getUserByEmail(loginUserDto.email);

    if (!currentUser) {
      throw new UnauthorizedException('User is not exist');
    }

    const isValidPassword = await validatePassword(loginUserDto.password, currentUser.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Your password is wrong');
    }

    const accessToken = await this.jwtTokenService.generateJwtToken({
      email: currentUser.email,
    });

    /**
     * REDIS IMPLEMENTATION
     */
    await this.redisClientService.set('TEST', 'VALUE', 80600);

    return {
      accessToken,
    };
  }
}
