import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';

import {IResponse, success, failure, exception} from 'src/shared/response/http-message';

import { RegisterUserDto } from 'src/modules/auth/dtos/registerUser.dto';
import { ResendEmailDto } from 'src/modules/auth/dtos/resendEmail.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';

import { EmailService } from 'src/modules/email/email.service';
import { JwtService } from 'src/modules/auth/jwt.service';

import { IUserModel, validEmailPattern,
	 createUser, activateUser, updateVerifyToken,  updateResetToken, updatePassword,
	 findById, findByEmail, findEmailAndToken, findByIdAndResetToken,
	 decode64,  isEmpty, aroundMinute, comparePassword
       } from 'src/modules/user/user.model';

const pass_salt_rounds = 10;
const user_salt = 'myappsecret'; //TODO: dont store here
const reset_token_expire = 3;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @InjectModel('User') private readonly userModel: IUserModel,
    private readonly  configService: ConfigService
  ) {
        
  }

  query() { }
  operations() { }
  
  createAuthTokenWithBasicHeaders(){}

  async createAuthTokenWithJson(loginDto: LoginDto): Promise<IResponse<any>>{
    
    let email = loginDto.email;
    let password = loginDto.password;
    
    if(!email && !password){
      return exception('auth.login.required_mandatory_fileds_parse_err');
    }
    
    let foundedUser = await this.userModel.findOne({ email:email });

    if(!foundedUser) return exception('auth.login.user_not_found', HttpStatus.NOT_FOUND);

    const isVerified = (foundedUser.auth.validated_email || foundedUser.status == 'active');

    if(!isVerified){
      return exception('auth.login.user_not_verified_email', HttpStatus.FORBIDDEN);
    }

    const isValidPassword = comparePassword(password, foundedUser.auth.password);
    
    if(!isValidPassword){
      return exception('auth.login.error', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.jwtService.createToken(email, foundedUser.auth.roles);
    return success('auth.login.success', accessToken );
  }

async activateUserWithEmailToken(token: string|any): Promise<IResponse<any>>{
  let tokenA = token.split('.');
  let email = decode64(tokenA[0]);
  
  let foundedUser = await findEmailAndToken(this.userModel, email, token);
  
  if(isEmpty(foundedUser)){
    return failure('token.email.invalid_token_user_not_have_token_request', foundedUser);
  }
  
  if(foundedUser[0].validated_email){
    return failure('user.email.user_already_validated_email');
  }
  
  let updatedUser = await activateUser(this.userModel, email, token);

  if (updatedUser.ok !== 1){
    return exception('token.email.cannot_update_user');
    
  }else if(updatedUser.ok == 1){
    return success('token.email.success_activate_user', updatedUser.email);
  }else{
    return failure('token.email.generic_error_failure');
  }
}

async registerAuthThroughEmail(registerUserDto: RegisterUserDto) : Promise<IResponse<any>> {
  
  let isuer = registerUserDto;
  const requiredInput = (isuer.email && isuer.password);
  const isValidEmail = validEmailPattern(isuer.email);
  
  if(!isValidEmail && !requiredInput){
    return failure('user.registration.missing_required_mandatory_field');
  }
  
  const isAlreadyRegisteredUser = await findByEmail(this.userModel, isuer.email);

  if(isAlreadyRegisteredUser && !isAlreadyRegisteredUser.validated_email){
    return failure('user.registration.user_exist_email_not_confirmed');
  }

  if(isAlreadyRegisteredUser){
    return exception('user.registration.user_already_exists', HttpStatus.FORBIDDEN);
  }
  
  const new_user = await createUser(this.userModel, isuer);
  const isCreated = new_user;
  
  const isSent = await this.sentEmailVerification(new_user.email); 

  if(isCreated && isSent.success){
    return success('user.registration.success',new_user); // TODO: remove this
  } else if(isCreated && isSent.exception){
    return failure('user.registration.cannot_sent_email', isSent.exception);
  }else{
    return failure('user.registration.generic_error');
  }
}

async sentEmailVerification(email: string){
  //findEmail
  let userData = await findByEmail(this.userModel, email);

  if(!userData){
    return {exception: 'user.email.doesnt_not_exists', data: null}
  }
  let userIsValid = userData.validated_email;
  let userDataToken = userData.auth.verify_token;

  if(!userDataToken || userDataToken == ''){
    return {exception: 'user.email.token_not_created_before', data: null};
  }
  
  if(userIsValid){
    return {exception: 'user.email.user_already_validated', data: null}
  }
  

  let emailOptions = {
    from: 'company',
    to: email,
    text: 'Verify Email',
    subject: 'Verify Email',
    html:'email token:  /api/auth/verify-token/'+userDataToken+''
  }
  
  const isSent = await this.emailService.sentEmail(emailOptions);

  if(Boolean(isSent)){
    return {success: 'email is sent', data: userDataToken}
  }else{
    return {exception: 'email is not sent', data:null}
  }
  
}

async sentEmailResetToken(email: string, token: string): Promise<any>{    
  let emailOptions = {
    from: 'company',
    to: email,
    text: 'Reset Password',
    subject: 'Reset Password',
    html:'reset token:  /api/auth/reset-password-token/'+token+''
  };

  let emailer = await this.emailService.sentEmail(emailOptions);
  return {success: true, data: emailer};
}

async resendEmailVerification(resendEmail: ResendEmailDto): Promise<IResponse<any>>{

  const required = resendEmail.email;    
  if(!required){
    return exception('required field');
  }
  
  let foundedUser = await findByEmail(this.userModel, resendEmail.email);
  
  if( !foundedUser){
    return failure('email.resend_email.user_doesnt_exists');
  }
  
  let userIsValid = foundedUser.validated_email;

  if(userIsValid){
    return failure('email.resend_email.user_already_validated_email');
  }

  const createdToken = await updateVerifyToken(this.userModel, resendEmail.email);
  
  const isSent = await this.sentEmailVerification(resendEmail.email);
  
  if(Boolean(isSent.success) && createdToken.ok == 1){
    return success('email.resend_email.success', isSent.data);
  }else if(Boolean(isSent.success) && createdToken.ok !== 1){
    return failure('email.resend_email.failed_to_create_token', isSent.exception);
  }else if(isSent.exception){
    return failure('email.resend_email.failure', isSent.exception);
  }else{
    return failure('resend.email.generic_error_resend_email_verification');
  }
}

async forgotPasswordWithEmail(resendEmailDto : ResendEmailDto) :Promise<IResponse<any>>{
  const required = resendEmailDto.email;
  if(!required){
    return failure('reset.password.missing_mandatory_fields');
  }
  const foundedUser = await findByEmail(this.userModel, resendEmailDto.email);

  if(!foundedUser){
    return failure('reset.password.user_doesnt_exists');
  }

  const isHaveResetTokenBefore = (foundedUser.auth.reset_token !== '');

  if(isHaveResetTokenBefore){
    const reset_token = foundedUser.auth.reset_token.split('.');
    const token_stamp = reset_token[2];
    const token_minute = aroundMinute(token_stamp);
    const isRecentlyCreatedToken =  token_minute < reset_token_expire;
    
    if(isRecentlyCreatedToken){
      return failure('reset.password.recently_created_reset_token_email_minute', token_minute);
    }
  }

  const email = resendEmailDto.email;
  const updatedUserResetToken = await updateResetToken(this.userModel, email);
  const updatedUser = await findByEmail(this.userModel, email);
  const isSent = await this.sentEmailResetToken(resendEmailDto.email, updatedUser.auth.reset_token);

  if(updatedUserResetToken.nModified !== 1){
    return failure('reset.password.cannot_update_token_request_generic_error');
  }
  
  if(!Boolean(isSent)){
    return failure('reset.password.cannot_send_email');
  }
  
  return success('result.password.token_generated_check_email', updatedUser.auth.reset_token);
}


async resetPasswordWithToken(resetPasswordDto: ResetPasswordDto, token: any ) :Promise<IResponse<any>>{
  const required = (resetPasswordDto.new_password && token.split('.').length == 3 );
  
  if(!required){
    return failure('missing mandatory, required new_password, and token');
  }

  let new_password = resetPasswordDto.new_password;
  let changedPassword = await updatePassword(this.userModel, token, new_password);
  
  if(changedPassword.ok !== 1){
    return failure('reset.password.cannot_update_password_generic_error.');
  };

  //TODO: note check matched token, compare password
  return success('rest.password.succesfull',changedPassword);
}
}
