import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';


import { AppModule } from './app.module'
import config from './config';

const conf = config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(conf.http.port);

  console.log('Http Application started at port ', conf.http.port);

  return app;
}

const server = bootstrap();
