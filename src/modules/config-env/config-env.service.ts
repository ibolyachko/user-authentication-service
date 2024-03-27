import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigEnv } from '@/modules/config-env/config-env.schema';

@Injectable()
export class ConfigEnvService {
  constructor(private configService: ConfigService<ConfigEnv, true>) {}

  get<T extends keyof ConfigEnv>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
