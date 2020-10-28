import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';                                                          

import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';

import { IUserModel } from 'src/modules/user/user.model';

@Injectable()                                                                                        
export class JwtService {
  constructor(private readonly configService: ConfigService,
	      @InjectModel('User') private readonly userModel: IUserModel){}

  async createToken(email, roles){
    let jwtConfig = this.configService.get('jwt');
    let expiresIn = jwtConfig.expiresIn;
    let salt      = jwtConfig.salt;
    let user_sign      = {email: email, roles: roles };
    let token = jwt.sign(user_sign, salt, {expiresIn});
    return {
      expires_in: expiresIn,
      access_token: token
    }
  }

  async verifyUser(signedEmail){
    const record =  await this.userModel.findOne({email: signedEmail});
    if(record){
      return record;
    }
    return null;   
  }
}
