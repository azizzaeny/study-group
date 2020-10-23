import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './services/auth.service';
import {JwtService} from './services/jwt.service';
import {JwtStrategy } from './strategy/jwt.strategy';

import { EmailService } from 'src/providers/email/email.service';
import { AuthController } from 'src/api/rest/controllers/auth.controller';
import { LoggerMiddleware } from 'src/api/rest/middleware/logger.middleware';

import { UserSchema } from 'src/providers/user/domain/entity';

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
