import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  root() {
    return this.appService.root();
  }
  @Get('api')
  getApi() {
    return this.appService.root();
  }
}
