import { Module } from '@nestjs/common';

import { ConfigEnvService } from '@/modules/config-env/config-env.service';

@Module({
  providers: [ConfigEnvService],
  exports: [ConfigEnvService],
})
export class ConfigEnvModule {}
