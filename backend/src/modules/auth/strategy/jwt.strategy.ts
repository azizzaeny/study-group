
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
    });
  }

  public async validate(payload: any, req: any, done: Function){
    const user = await this.jwtService.verifyUser(req);
    if(!user){
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
