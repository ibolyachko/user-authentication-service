import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtTokenModule } from '@/modules/jwt-token/jwt-token.module';
import { RedisClientModule } from '@/modules/redis-client/redis-client.module';
import { UserModule } from '@/modules/user/user.module';
import { JwtStrategy } from '@/strategies/JwtStrategy';

@Module({
  imports: [UserModule, JwtTokenModule, RedisClientModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
