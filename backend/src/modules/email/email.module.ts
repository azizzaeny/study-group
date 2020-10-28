import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from 'src/shared/middleware/logger.middleware';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService]
})
export class EmailModule implements NestModule {
  constructor() { }
  configure() { }
}
