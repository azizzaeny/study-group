import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

const configModule = ConfigModule.forRoot({
  load: [config]
});

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
