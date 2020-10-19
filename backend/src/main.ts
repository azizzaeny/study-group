import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from 'components/interceptor/timeout.interceptor';
import { HttpExceptionFilter } from 'components/filters/http-exception.filter';


async function bootstrapHttp() {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();
    //app.useLogger
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        }));
    app.enableCors({ credentials: true });
    app.setGlobalPrefix('api');
    await app.listen(3000, _ => console.log('Http server up and running on port 3000'));
    return app;
}

async function bootstrapServices() { }

bootstrapHttp();
bootstrapServices();


