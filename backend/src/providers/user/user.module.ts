import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './services/user.service';
import { UserController } from 'src/api/rest/controllers/user.controller';
import { LoggerMiddleware } from 'src/api/rest/middleware/logger.middleware';

import { UserSchema } from 'src/providers/user/domain/entity';

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
