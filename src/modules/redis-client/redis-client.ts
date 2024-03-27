import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

import { ConfigEnvService } from '@/modules/config-env/config-env.service';

export const RedisClient: Provider = {
  inject: [ConfigEnvService],
  provide: 'REDIS_CLIENT',
  useFactory(configEnvService: ConfigEnvService) {
    return new Redis({
      host: configEnvService.get('REDIS_HOST'),
      port: configEnvService.get('REDIS_PORT'),
    });
  },
};
