import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import {JwtService} from './jwt.service';
import {JwtStrategy } from './strategy/jwt.strategy';

import { EmailService } from 'src/modules/email/email.service';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from 'src/shared/middleware/logger.middleware';
import { UserSchema } from 'src/modules/user/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtService, JwtStrategy]
})

export class AuthModule implements NestModule {
  constructor() { }
  configure(consumer: MiddlewareConsumer) {
    return consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
