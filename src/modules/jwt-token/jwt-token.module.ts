import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtTokenService } from '@/modules/jwt-token/jwt-token.service';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
