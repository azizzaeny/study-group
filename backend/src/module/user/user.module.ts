import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) { }
}
