import {
  Module, MiddlewareConsumer, NestModule, RequestMethod, UseFilters
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EmailService } from 'src/modules/email/email.service';
import { AuthController } from './auth.controller';
import { JwtTokenMiddleware } from 'src/shared/middleware/jwt-token.middleware';
// import { BasicHeadersMiddleware} from 'src/shared/middleware/basic.middleware';
import { UserSchema } from 'src/modules/user/user.model';
import { DefaultExceptionFilter } from 'src/shared/filters/default-exception.filter';
import * as passport from 'passport';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtService, JwtStrategy, UserService]
})
@UseFilters(new DefaultExceptionFilter())
export class AuthModule implements NestModule {
  constructor() { }
  configure(consumer: MiddlewareConsumer) {
    
    // consumer.apply(passport.authenticate('jwt', { session: false }))
    //   .forRoutes({ path: '/users', method: RequestMethod.ALL });
    
    consumer
      .apply(JwtTokenMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.ALL });
    
    // consumer
    //   .apply(BasicHeadersMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL});
  }
}
