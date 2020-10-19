import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }
    @Get()
    referDocumentation(): string {
        return 'To use this services Please read documentation at https://github.com/azizzaeny/study-group/ ';
    }
}
