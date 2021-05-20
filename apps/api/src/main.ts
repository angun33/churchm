/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(environment.cookie_secret));

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
