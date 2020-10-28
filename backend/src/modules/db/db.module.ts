import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';
import { db_url } from './db';
const conf = config();
const mongooseModule = MongooseModule.forRoot(db_url(conf.db));

@Module({
  imports: [mongooseModule],
  providers: [],
  exports: [mongooseModule]
})
export class DbModule { }
