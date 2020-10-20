import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from './config';
import { db_url } from './domain/db';

const conf = config();

const configModule = ConfigModule.forRoot({
  load: [config]
});

const mongooseModule = MongooseModule.forRoot(db_url(conf.db));

@Module({
  imports: [configModule, mongooseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
