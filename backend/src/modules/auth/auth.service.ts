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
	 findByEmail, findEmailAndToken, 
	 findResetToken,
	 decode64,  isEmpty, aroundMinute, comparePassword
       } from 'src/modules/user/user.model';

const pass_salt_rounds = 10;
const user_salt = 'myappsecret'; //TODO: dont store here
const reset_token_expire = 3; // 3 minutes

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @InjectModel('User') private readonly userModel: IUserModel,
    private readonly  configService: ConfigService
  ) { }


  
  async createAuthToken(loginDto: LoginDto): Promise<any>{
    let email    = loginDto.email;
    let password = loginDto.password;
    
    if(!email && !password){
      return {
	error: 'auth.login.required_mandatory_fileds_parse_err'
      }
    }
    let foundedUser = await this.userModel.findOne({ email: email });
    
    if(!foundedUser){
      return {
	error: 'auth.login.user_not_found',
	status: HttpStatus.NOT_FOUND
      };
    }

    const isVerified = (foundedUser.auth.validated_email || foundedUser.status == 'active');

    if(!isVerified){
      return {
	error: 'auth.login.user_not_verified_email',
	status: HttpStatus.FORBIDDEN
      }
    }

    console.log(foundedUser);
    const isValidPassword = await comparePassword(password, foundedUser.auth.password);  
    if(!isValidPassword){
      return {
	error: 'auth.login.error_password',
	status: HttpStatus.UNAUTHORIZED
      }
    };
    
    let roles = foundedUser.auth.roles;
    let method = foundedUser.auth.method;
    let payload = {email: email, roles: roles, type: method};

    const accessToken = await this.jwtService.createToken(payload);
    
    return {
      msg: 'auth.login.success',
      value: accessToken
    };
  }


  
  
  async activateUser(token: string): Promise<any>{
    let tokenSpec = token.split('.');
    let emailSpec = tokenSpec[0];
    
    if(emailSpec == ""){
      return {
	error: 'user.verify.token_was_not_valid_empty_token',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    let email = decode64(tokenSpec[0]);
    let isValidEmail = validEmailPattern(email);

    if(!isValidEmail){
      return {
	error: 'user.verify.token_was_not_valid_email',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    let foundedUser = await findEmailAndToken(this.userModel, email, token);
    
    if(!foundedUser){
      return {
	error: 'token.email.invalid_token_user_not_have_token_request',
	status: HttpStatus.FORBIDDEN
      };
    }
    
    if(foundedUser.validated_email){
      return {
	error: 'user.email.user_already_validated_email',
	status: HttpStatus.FORBIDDEN
      };
    }
    
    let updatedUser = await activateUser(this.userModel, email, token);

    if(!updatedUser){
      return {
	error: 'user.verify.cannot_update_user_token',
	status: HttpStatus.FORBIDDEN
      }
    }

    return {
      msg: 'token.email.success_activate_user',
      value: updatedUser
    }

  }



  
  async register(registerUserDto: RegisterUserDto) : Promise<any> {
    let issuer = registerUserDto;
    const requiredInput = (issuer.email && issuer.password);

    if(!requiredInput){
      return {
	error: 'user.registration.missing_required_mandatory_field',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    const isValidEmail = validEmailPattern(issuer.email);
    if(!isValidEmail){
      return {
	error : 'user.registration.email_was_not_valid',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    const isAlreadyRegisteredUser = await findByEmail(this.userModel, issuer.email);

    if(isAlreadyRegisteredUser && !isAlreadyRegisteredUser.validated_email){
      return {
	error: 'user.registration.user_exist_email_not_confirmed',
	status: HttpStatus.FORBIDDEN
      }
    }

    if(isAlreadyRegisteredUser){
      return {
	error: 'user.registration.user_already_exists',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    const new_user = await createUser(this.userModel, issuer);

    if(!new_user){
      return {
	error:'user.cannot_register_user_generic_error',
	status: HttpStatus.FORBIDDEN
      } 
    }
    const sentVerify = await this.emailService.sentEmailRegistration(new_user); 

    if(!sentVerify){
      return{
	error: 'user.registratrion.cannot_sent_email',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    return {
      msg: 'user.registration.success',
      value: {
	email: new_user.email,
	auth: {
	  verify_token: new_user.auth.verify_token
	}
      }
    };
  }


  
  async resendVerification(resendEmail: ResendEmailDto)
  : Promise<any>{
    
    const email   = resendEmail.email;
   
    if(!email){
      return {
	error:'email.verify.required_email_input',
	status: HttpStatus.FORBIDDEN
      };
    }
    
    let foundedUser = await findByEmail(this.userModel, email);
    if(!foundedUser){
      return {
	error:'email.resend_email.user_doesnt_exists',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    const already_validated = foundedUser.validated_email
    if(already_validated){
      return {
	error:'email.resend_email.user_already_validated_email',
	status: HttpStatus.FORBIDDEN
      }
    }

    const createdToken = await updateVerifyToken(this.userModel, email);
    
    if(!createdToken){
      return {
	error: 'email.verify.valied_to_update_token',
	status: HttpStatus.FORBIDDEN
      }
    }
    const sentEmail = await this.emailService.sentEmailRegistration(createdToken);

    if(!sentEmail){
      return {
	error: 'email.resend_email.failed_to_send_email',
	status: HttpStatus.FORBIDDEN
      }
    }
    return{
      msg: 'email.resend_email.email_bas_been_sent',
      value: createdToken // note: dont sent the token
    }
  }



  
  async requestPassword(resendEmailDto : ResendEmailDto) :Promise<any>{
    const email = resendEmailDto.email;
    
    if(!email){
      return {
	error:'reset.password.missing_mandatory_fields',
	status: HttpStatus.FORBIDDEN
      }
    }
    const foundedUser = await findByEmail(this.userModel, email);
    if(!foundedUser){
      return failure('reset.password.user_doesnt_exists');
    }
    const already_validated = foundedUser.validated_email
    
    if(!already_validated){
      return {
	error:'reset.password.user_not_yet_validated_email',
	status: HttpStatus.FORBIDDEN
      }
    }

    const isHaveResetTokenBefore = (foundedUser.auth.reset_token && foundedUser.auth.reset_token !== '');

    if(isHaveResetTokenBefore){
      const reset_token = foundedUser.auth.reset_token.split('.');
      const token_stamp = reset_token[2];

      if(!token_stamp){
	return {
	  error: 'reset.password.invalid.reset_token',
	  status: HttpStatus.FORBIDDEN
	}
      } 
      const token_minute = aroundMinute(token_stamp);
      
      const isRecentlyCreatedToken =  token_minute < reset_token_expire;
      
      if(isRecentlyCreatedToken){
	return {
	  error: 'reset.password.recently_created_reset_token_email',
	  status: HttpStatus.FORBIDDEN
	}
      }

    }

    const updatedUser = await updateResetToken(this.userModel, email);
    if(!updatedUser){
      return{
	error:'reset.password.cannot_update_reset_token',
	status: HttpStatus.FORBIDDEN
      }
    }
    const sentEmail = await this.emailService.sentEmailResetToken(updatedUser);

    if(!sentEmail){
      return {
	error: 'reset.password.cannot_send_email_reset_token',
	status: HttpStatus.FORBIDDEN
      }
    }
    return {
      msg:'result.password.token_generated_check_email',
      value: updatedUser
    }
    
  }


  async resetPassword(resetPasswordDto: ResetPasswordDto ) :Promise<any>{
    const new_password = resetPasswordDto.new_password;
    const password = resetPasswordDto.confirm_password;
    const token = resetPasswordDto.token || '';
    const email = resetPasswordDto.email;
    const validTokenPayload = (token.split('.').length == 3);
    
    if(!validTokenPayload){
      return {
	error:'reset.password.missing_mandatory_invalid_valid_token',
	status: HttpStatus.FORBIDDEN
      }
    }

    if(new_password !== password){
      return {
	error: 'reset.password.password_not_match',
	status: HttpStatus.FORBIDDEN
      }
    }

    let extractToken = token.split('.');
    let extractEmail = extractToken[0];

    if(extractEmail == ""){
      return {
	error: 'reset.password.not_valid_token',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    let decodedEmail = decode64(extractEmail);

    if(email !== decodedEmail){
      return {
	error: 'reset.password.invalid_reset_token_email_not_valid',
	status: HttpStatus.FORBIDDEN
      }
    }

    
    const foundedUser = await findResetToken(this.userModel, email, token);

    if(!foundedUser){
      return {
	error: 'reset.password.invalid_reset_token_user_token_not_found',
	status: HttpStatus.FORBIDDEN
      }
    }

    let reset_token = foundedUser.auth.reset_token;
    
    if( reset_token && reset_token !== ''){
      let token_stamp = reset_token.split('.')[2];

      if(!token_stamp){
	return {
	  error: 'reset.password.invalid_reset_token_not_valid_timepass',
	  status: HttpStatus.FORBIDDEN
	}
      }

      let token_minute = aroundMinute(token_stamp);
      let isValidTime = token_minute < reset_token_expire;
      
      if (!isValidTime){
	return {
	  error: 'reset.password.invalid_reset_password_expire_token',
	  status: HttpStatus.FORBIDDEN
	}
      }
    }
    
    let changedPassword = await updatePassword(this.userModel, email, new_password);

    if(!changedPassword){
      return {
	error:'reset.password.cannot_update_password_generic_error',
	status: HttpStatus.FORBIDDEN
      }
    }
    
    return{
      msg: 'reset.password.successfull',
      value: {
	email: changedPassword.email
      }
      
    }
  }


}
