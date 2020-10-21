import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service';

import { UserSchema } from './user.interface';
import { AuthSchema } from './../auth/auth.interface';
import { feature } from './../../domain/util';

import { LoggerMiddleware } from './../../common/middlewares/logger.middleware';

const mongooseFeature = MongooseModule.forFeature([
  feature('User', UserSchema),
  feature('Auth', AuthSchema)
]);

@Module({
  imports: [mongooseFeature],
  controllers: [UserController],
  providers: [UserService, AuthService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
