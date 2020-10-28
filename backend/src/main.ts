import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DefaultExceptionFilter } from 'src/shared/filters/default-exception.filter';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { AppModule } from './app.module'
import config from './config';

const conf = config();

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(bodyParser.json({ limit: conf.json.limit }));
  app.use(bodyParser.urlencoded(conf.json));

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new DefaultExceptionFilter());


  await app.listen(conf.http.port);


  console.log('Http Application started at port ', conf.http.port);

  return app;
}

const server = bootstrap();
