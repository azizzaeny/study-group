import { Module, MiddlewareConsumer, RequestMethod, UseFilters } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DbModule } from 'src/modules/db/db.module';
import { EmailModule } from 'src/modules/email/email.module';
import { DefaultExceptionFilter } from 'src/shared/filters/default-exception.filter';
import { LoggerMiddleware } from 'src/shared/middleware/logger.middleware';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    DbModule,
    UserModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
@UseFilters(new DefaultExceptionFilter())
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer.apply(LoggerMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
