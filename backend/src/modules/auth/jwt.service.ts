import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';                                                          
import { ConfigService } from '@nestjs/config';
import { IUserModel } from 'src/modules/user/user.model';
import { UserService } from 'src/modules/user/user.service';
import { InjectModel } from '@nestjs/mongoose';

import config from 'src/config';

const conf = config();
@Injectable()                                                                                        
export class JwtService {
  constructor(private readonly configService: ConfigService,
	      private readonly userService: UserService){}

  async createToken(payload){
    // let jwtConfig = this.configService.get('jwt');    
    let expiresIn = conf.jwt.expiresIn;
    let salt      = conf.jwt.salt;

    let user_sign = Object.assign({}, payload);
    let token = jwt.sign(user_sign, salt, { expiresIn });
    return {
      expires_in: expiresIn,
      jwt: token,
      refreshToken: ''
    }
  }

  async verifyUser(email){
    const record =  await this.userService.getUserByEmail(email);
    if(record.error){
      return null;
    }else{
      return record
    }
  }
}
