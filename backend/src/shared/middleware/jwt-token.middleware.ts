import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtService } from 'src/modules/auth/jwt.service';

@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  constructor(
    protected readonly jwtService: JwtService,
  ) { }
  
  async use(req: any, res: any, next: () => void) {

    req.locals = req.locals || {};
    req.locals.user = null;

    const token: string = this.getBearerToken(req);
    if (token) {
      const isTokenValid: boolean = this.verifyToken(token);
      
      if (isTokenValid) {
        const payload: any = this.getTokenPayload(token);
        req.locals.user = {
            email : payload.email,
          roles : payload.roles,
        };
      }      
    }
    next();
  }

  private getTokenPayload(token: string): any {
    
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }
  

  private verifyToken(token: string): any {
    let payload = this.getTokenPayload(token);
    if(payload){
      let email = payload.email;
      return !!this.jwtService.verifyUser(email);
    }else{
      return false
    }

  }

  private getBearerToken(req: any): string {
    try {
      return req.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }
}
