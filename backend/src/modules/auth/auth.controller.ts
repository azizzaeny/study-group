import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
  Param,
  Req,
  Request
} from '@nestjs/common';


import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';
import { RegisterUserDto } from 'src/modules/auth/dtos/registerUser.dto';
import { ResendEmailDto } from 'src/modules/auth/dtos/resendEmail.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { decode64 } from 'src/modules/user/user.model';

// import { AuthGuard } from 'src/modules/auth/auth.guard';
//import { User } from 'src/shared/decorators/user.decorator';

import {IResponse, response, success, failure} from 'src/shared/response/http-message';
import {ValidationPipe} from 'src/shared/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @Get()
  async createAuthTokenWithBasicHeaders(@Req() req) {
    let authorization = req.headers.authorization;
    if(authorization){
      let basic = req.headers.authorization.split(' ')['1'];
      let userpass =  decode64(basic).split(':');
      let payload = { email: userpass[0], password:userpass[1]};
      let result = await this.authService.createAuthToken(payload);
      return response(result);
      
    }else{
      failure('user.login_failure_no_supplied_basic_headers');
    }
  }


  
  @Post()
  public async createAuthTokenWithJson(@Body() loginDto: LoginDto): Promise<IResponse<any>>{
    //    try{
    let payload = loginDto;
    let result =  await this.authService.createAuthToken(payload);
      return response(result);
      
  //  }catch(err){
    // return failure('user.login_failure.login_generic_error'); 
    // }
  }

  
  @Post('register')
  @HttpCode(HttpStatus.OK) 
  public async registerAuthThroughEmail(@Body(new ValidationPipe()) registerUserDto: RegisterUserDto): Promise<IResponse<any>> {
    try{
      let result = await this.authService.register(registerUserDto);
      return response(result);
    }catch(err){
      return failure('error.registration.generic_error', err);
    }
  }


  
  @Post('resend-verification')
  public async resendEmailVerification(@Body(new ValidationPipe()) resendEmailDto: ResendEmailDto) :Promise<IResponse<any>>{
    try{
      return response(await this.authService.resendVerification(resendEmailDto));
    }catch(err){
      return failure('error.resend-verivication.generic_error');
    }
  }



  
  @Get('verify-email/:token')
  public async activateUserWithEmailToken(@Param() params): Promise<IResponse<any>>{
    try{
      return response(await this.authService.activateUser(params.token));
    }catch(err){
      return failure('error.verify-email.generic_error');
    }
}


  
  @Post('request-password')
  public async forgotPasswordWithEmail(@Body() resendEmailDto : ResendEmailDto) : Promise<IResponse<any>>{
   try{
     return response(await this.authService.requestPassword(resendEmailDto)); 
   }catch(err){
     return failure('error.reset-password.generic_error');
   }
  }

  
  @Post('reset-password')
  public async resetPasswordWithToken(@Body() resetPasswordDto: ResetPasswordDto, @Param() params) : Promise<IResponse<any>>{
    try{
      return response(await this.authService.resetPassword(resetPasswordDto));
    }catch(err){
    return failure('error.reset-password.generic_error');
    }
  }


  @Post('logout')
  public async logout(){
    return success('logout.success');
  }
}
