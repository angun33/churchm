import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser(environment.cookie_secret));

  app.disable('x-powered-by');
  app.enableCors({
    origin: true,
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // TODO: CSRF/XSRF
  // https://docs.nestjs.com/security/csrf
  // https://github.com/expressjs/csurf

  const config = new DocumentBuilder()
    .setTitle('Church Management API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      name: 'JWT Authorization',
      in: 'header',
      description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
