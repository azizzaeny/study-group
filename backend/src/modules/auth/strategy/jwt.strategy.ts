import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/modules/auth/jwt.service';
import { PassportStrategy } from '@nestjs/passport';

import config from 'src/config';
const conf = config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){  
  constructor(
    private readonly jwtService: JwtService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,                           
      secretOrKey: conf.jwt.salt,        
    }, async (req, payload, next)=>{
      this.verify(req, payload, next);
    });
    passport.use(this);
  }

  public async verify(payload: object, req, done){    
    const user = await this.jwtService.verifyUser(payload);
    if(!user){
      return done('unauthorized Request', false);
    }else{
      return done(null, payload);
    }
  }
}
