import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DefaultExceptionFilter } from './common/filters/default-exception.filter';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module'
import config from './config';

const conf = config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));



  app.useGlobalFilters(new DefaultExceptionFilter());

  await app.listen(conf.http.port);

  console.log('Http Application started at port ', conf.http.port);

  return app;
}

const server = bootstrap();
