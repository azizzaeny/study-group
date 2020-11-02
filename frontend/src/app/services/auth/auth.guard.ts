import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let isLoggedIn   = this.authService.isLoggedIn();
    if(isLoggedIn){

      let token        = this.authService.getJwtToken();
      let parsed       = this.authService.parseJwt(token);
      let hasRoleAdmin = this.authService.hasRole(parsed.roles, ['user_admin']);		    
      let isAdmin   =  isLoggedIn && hasRoleAdmin;
      
      let isMember  =  isLoggedIn && !hasRoleAdmin;
      
      if (isMember) {
	this.router.navigate(['/dashboard/profile']);
      }else if(isAdmin){	
	this.router.navigate(['/dashboard/']);	
      }
    }
  
    return !isLoggedIn;
  }

}
