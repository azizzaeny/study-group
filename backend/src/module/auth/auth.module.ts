import {
  Module, MiddlewareConsumer, NestModule
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema } from './auth.interface';
import { UserService } from './../user/user.service';
import { UserSchema } from './../user/user.interface';
import { feature } from './../../domain/util';

const mongooseFeature = MongooseModule.forFeature([
  feature('User', UserSchema),
  feature('Auth', AuthSchema)
]);

@Module({
  imports: [mongooseFeature],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule implements NestModule {
  constructor() { }
  configure(consumer: MiddlewareConsumer) { }
}
