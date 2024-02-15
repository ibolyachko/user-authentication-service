import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisClient } from './redis-client';
import { RedisClientService } from './redis-client.service';

@Module({
  imports: [ConfigModule],
  providers: [RedisClient, RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
