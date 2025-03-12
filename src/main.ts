import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  configDotenv();
  app.enableCors();
  app.setGlobalPrefix('api'); // use can use v1 or v2
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
      'Authorization',)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const prisma = new PrismaClient();
  await seedSuperAdminUser(prisma);

  await app.listen(3000);
}
async function seedSuperAdminUser(prisma: PrismaClient) {
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: 'SUPERADMIN' },
  });

  if (!existingSuperAdmin) {
    console.log('Creating default SUPERADMIN user...');

    const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);

    await prisma.user.create({
      data: {
        name: process.env.SUPERADMIN_NAME,
        email: process.env.SUPERADMIN_EMAIL,
        mobile: process.env.SUPERADMIN_MOBILE,
        password: hashedPassword,
        role: 'SUPERADMIN',
      },
    });

    console.log('SUPERADMIN user created.');
  } else {
    console.log('SUPERADMIN user already exists. Skipping creation.');
  }
}
bootstrap();
