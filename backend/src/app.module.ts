import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenMiddleware }  from 'src/shared/middleware/jwt-token.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DbModule } from 'src/modules/db/db.module';
import { EmailModule } from 'src/modules/email/email.module';

import config from './config';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config]
});

@Module({
  imports: [
    configModule,
    DbModule,
    UserModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
