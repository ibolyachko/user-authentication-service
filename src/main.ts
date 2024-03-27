import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/modules/app/app.module';
import { ConfigEnvService } from '@/modules/config-env/config-env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigEnvService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
