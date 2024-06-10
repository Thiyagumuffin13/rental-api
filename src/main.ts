import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true
  });
  app.enableCors();
  app.setGlobalPrefix('api'); // use can use v1 or v2
  await app.listen(3000);
}

bootstrap();
