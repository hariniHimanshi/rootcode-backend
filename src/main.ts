import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

export const {
  PORT,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_NAME
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  console.log({ secret: process.env.jwt_secret });
  await app.listen(PORT);


}

function validateEnvConfigs() {
  console.debug(".env =", {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD
  });

  if (!PORT) {
    throw new Error("PORT is not configured in the .env file");
  }

  if (!DATABASE_HOST) {
    throw new Error("DATABASE_HOST is not configured in the .env file");
  }

  if (!DATABASE_USER) {
    throw new Error("DATABASE_USER is not configured in the .env file");
  }

  if (!DATABASE_PASSWORD) {
    throw new Error("DATABASE_PASSWORD is not configured in the .env file");
  }

  if (!DATABASE_PORT) {
    throw new Error("DATABASE_PORT is not configured in the .env file");
  }

  if (!DATABASE_NAME) {
    throw new Error("DATABASE_NAME is not configured in the .env file");
  }
}

validateEnvConfigs();
bootstrap();
