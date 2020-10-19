import { Get, Controller } from '@nestjs/common';
import { docs_referer } from './core/return';

@Controller()
export class AppController {
    constructor() { }
    @Get()
    root(): { message: string, link: string } {
        return docs_referer();
    };

    @Get('api')
    rootApi(): { message: string, link: string } {
        return docs_referer();
    }
}
