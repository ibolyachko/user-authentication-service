import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisClientService {
  public constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async set(key: string, value: string, seconds: number) {
    await this.redis.set(key, value, 'EX', seconds);
  }

  async get(key: string) {
    return this.redis.get(key);
  }
}
