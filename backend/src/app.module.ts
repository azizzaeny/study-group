import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheckModule } from './rest-controllers/health-check/health-check.module';

@Module({
    imports: [HealthCheckModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
