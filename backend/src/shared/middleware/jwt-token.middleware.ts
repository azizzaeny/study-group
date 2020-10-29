import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// import { JwtService } from 'src/modules/auth/jwt.service';

/**
 * JWT token middle wire
 *
 * decode & verify authorization bearer token and
 * inject as req user
 */
@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  /**
   * @ignore
   */
  constructor(
    /*protected readonly jwtService: JwtService,*/
  ) { }

  /**
   * @ignore
   */
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
	console.log('requesting', req.user);
      }
    }

    next();
  }

  /**
   * Decode given jwt token and returns token payload
   */
  private getTokenPayload(token: string): any {
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  /**
   * verify token
   */
  private verifyToken(token: string): boolean {
    // let payload = this.getTokenPayload(token);
    // let email = payload.email;
    // return !!this.jwtService.verifyUser(email);
    return true;
  }

  /**
   * returns bearer header authorization token from request object
   */
  private getBearerToken(req: any): string {
    try {
      return req.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }
}
