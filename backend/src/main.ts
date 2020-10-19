import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { environment } from './environments/environment';
import { AppModule } from './app.module';
import { ValidationPipe } from './components/pipes/validation.pipe';
import { TimeoutInterceptor } from './components/interceptors/timeout.interceptor';
import { HttpExceptionFilter } from './components/filters/http-exception.filter';
import { debugRequest } from './components/middleware/debug.middleware';

async function bootstrapHttp() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.use(bodyParser.urlencoded());
    app.use(helmet());
    app.enableShutdownHooks();
    //app.useLogger
    (!environment.production) && app.use(debugRequest);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    //app.enableCors({ credentials: true });

    //app.setGlobalPrefix('api');

    await app.listen(3000);
    console.log('Http server up and running on port 3000')
    return app;
}

async function bootstrapServices() { }

bootstrapHttp();
bootstrapServices();


