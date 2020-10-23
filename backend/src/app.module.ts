import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RestModule } from 'src/api/rest/rest.module';
import { ProviderModule } from 'src/providers/provider.module';

import config from './config';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config]
});

@Module({
  imports: [
    configModule,
    ProviderModule,
    RestModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
