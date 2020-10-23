import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';


@Injectable()
export class EmailService{
  constructor(private readonly configService: ConfigService){}
  async sentEmail(emailOptions){
    let emailTransport = this.configService.get('mail');
    return Object.assign({}, emailTransport, emailOptions);
  }
}
