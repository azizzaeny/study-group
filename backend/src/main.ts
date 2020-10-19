import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrapHttp() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();
    await app.listen(3000);
    return app;
}

async function bootstrapServices() { }

bootstrapHttp();
bootstrapServices();


