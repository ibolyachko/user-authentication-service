import { Body, Controller, Post } from '@nestjs/common';

import { Serialize } from '@/interceptors/serialize.interceptor';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserDto)
  @Post('/register')
  registerUser(@Body() createUserDto: RegisterUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
