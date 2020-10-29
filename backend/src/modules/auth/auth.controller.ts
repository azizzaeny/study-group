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
// import { AuthGuard } from 'src/modules/auth/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';

import {IResponseS, IResponseF,IResponse, success, failure} from 'src/shared/response/http-message';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @Get()
  createAuthTokenWithBasicHeaders() {
    return 'get auth, generate';
  }
  
  @Post()
  public async createAuthTokenWithJson(@Body() loginDto: LoginDto): Promise<IResponse<any>>{
    try{
      return await this.authService.createAuthTokenWithJson(loginDto);
    }catch(err){
      return failure('user.login_failure.login_generic_error'); 
    }
  }
  @Post('register')
  @HttpCode(HttpStatus.OK) 
  public async registerAuthThroughEmail(@Body() registerUserDto: RegisterUserDto): Promise<IResponse<any>> {
    try{
      return await this.authService.registerAuthThroughEmail(registerUserDto);
    }catch(err){
      return failure('error.registration.catch_generic_error', err);
    }
  }
  @Post('resend-verification/')
  public async resendEmailVerificationn(@Body() resendEmailDto: ResendEmailDto) :Promise<IResponse<any>>{
    try{
      return await this.authService.resendEmailVerification(resendEmailDto);
    }catch(err){
      return failure('error.resend-verivication.catch_generic_error');
    }
  }
  
  @Get('verify-email/:token')
  public async activateUserWithEmailToken(@Param() params): Promise<IResponse<any>>{
    try{
      return await this.authService.activateUserWithEmailToken(params.token);
    }catch(err){
      return failure('error.verify-email.catch_generic_error');
    }
  }
  @Post('reset-password')
  public async forgotPasswordWithEmail(@Body() resendEmailDto : ResendEmailDto) : Promise<IResponse<any>>{
    try{
      return await this.authService.forgotPasswordWithEmail(resendEmailDto); 
    }catch(err){
      return failure('error.reset-password.catch_generic_error');
    }
    
  }
  
  @Post('reset-token/:token')
  public async resetPasswordWithToken(@Body() resetPasswordDto: ResetPasswordDto, @Param() params) : Promise<IResponse<any>>{
    return await this.authService.resetPasswordWithToken(resetPasswordDto, params.token);
  }
  
  @Post('logout')
  public async logout(){
    return success('logout.success');
  }
  @Get('view-token/:email')
  public async viewTokenEmail(){
    return success('viewed.token');
  }
  
  @Get('whoami')
  async showWhoMe(@Req() req){
    console.log(req.locals.email);
    return success('success', req.locals.email);
  }
}
