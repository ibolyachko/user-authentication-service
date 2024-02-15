import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisClient: Provider = {
  inject: [ConfigService],
  provide: 'REDIS_CLIENT',
  useFactory(configService: ConfigService) {
    return new Redis({
      host: configService.get('redis_host'),
      port: configService.get('redis_port'),
    });
  },
};
