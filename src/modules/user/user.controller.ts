import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '@/guards/jwt-guard';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { JwtPayload } from '@/modules/jwt-token/jwt-token.service';
import { UserDto } from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/info')
  getUserInfo(@Req() request: Request) {
    const { email } = request.user as JwtPayload;

    return this.userService.getUserByEmail(email);
  }
}
