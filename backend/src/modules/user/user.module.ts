import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/shared/middleware/logger.middleware';

import { UserSchema } from 'src/modules/user/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
