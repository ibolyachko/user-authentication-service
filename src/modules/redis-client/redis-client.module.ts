import { Module } from '@nestjs/common';

import { ConfigEnvModule } from '@/modules/config-env/config-env.module';

import { RedisClient } from './redis-client';
import { RedisClientService } from './redis-client.service';

@Module({
  imports: [ConfigEnvModule],
  providers: [RedisClient, RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
