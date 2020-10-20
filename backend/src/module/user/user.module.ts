import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.interface';
import { user_feature } from './../../domain/user';

const mongooseFeature = MongooseModule.forFeature(user_feature(UserSchema));

@Module({
  imports: [mongooseFeature],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) { }
}
