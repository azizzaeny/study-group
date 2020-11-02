import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';


@Injectable()
export class EmailService{
  constructor(private readonly configService: ConfigService){}


  emailOptions ={
    from : 'company',
    to: '',
    text: '',
    subject: '',
    html: '',
  };



  async sentEmail(opt){
    let emailTransport = this.configService.get('mail');
    return Object.assign({}, emailTransport, opt);
  }
  

  async sentEmailRegistration(issuer){
    let email   = issuer.email;
    let token   = issuer.auth.verify_token;
    let subject =  'Verify Email';
    let content = 'confirm your account : <a href="https://localhost:3000/api/auth/verify-token/'+token+'">verify account</a>';
    
    let options = Object.assign(this.emailOptions,{
      to : email,
      text: subject,
      subject,
      html: content
    });
    
    let sent = await this.sentEmail(options);
    return Boolean(sent);
  }

  
  async sentEmailResetToken(issuer): Promise<any>{
    let email = issuer.email;
    let token = issuer.auth.reset_token;
    let subject = 'Reset Password';
    
    let options = Object.assign(this.emailOptions,{
      to: email,
      text: subject,
      html:'reset password  <a href="http:localhost:3000/api/auth/reset-password-token/'+token+'"> reset password </a>'
    });
    
    let sentEmail = await this.sentEmail(options);
    return Boolean(sentEmail);
  }


}
