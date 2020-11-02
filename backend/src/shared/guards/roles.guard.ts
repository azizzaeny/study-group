import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());    
    const req = context.switchToHttp().getRequest();
    const user =  req.locals.user || req.user || { roles: []};
    const hasRole = () => user.roles.some((role) => roles.indexOf(role)> -1);
    var hasPermission = false;

    if(hasRole()){
      hasPermission = true;
      
      // if(req.params.email || req.body.email) {
      // 	if(req.user.email != req.params.email && req.user.email != req.body.email){ 
      // 	  hasPermission = false;
      // 	}
      // }
      // todo: move user validated to controller
    }
    console.log('hasM', hasPermission, roles, hasRole(), user);
    return user && user.roles && hasPermission;
  }
}
