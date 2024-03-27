import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigEnvModule } from '@/modules/config-env/config-env.module';
import { JwtTokenService } from '@/modules/jwt-token/jwt-token.service';

@Module({
  imports: [JwtModule, ConfigEnvModule],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
