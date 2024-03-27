import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigEnvModule } from '@/modules/config-env/config-env.module';
import { configEnvSchema } from '@/modules/config-env/config-env.schema';
import { RedisClientModule } from '@/modules/redis-client/redis-client.module';
import { UserModule } from '@/modules/user/user.module';
import { ConfigEnvService } from '@/modules/config-env/config-env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => configEnvSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigEnvModule],
      inject: [ConfigEnvService],
      useFactory: (configEnvService: ConfigEnvService) => ({
        type: 'postgres',
        host: configEnvService.get('DB_HOST'),
        port: configEnvService.get('DB_PORT'),
        username: configEnvService.get('DB_USER'),
        password: configEnvService.get('DB_PASSWORD'),
        database: configEnvService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigEnvModule,
    RedisClientModule,
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
