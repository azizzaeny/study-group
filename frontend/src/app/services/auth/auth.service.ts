import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tokens } from './token';

const config = { api_url: environment.api_url};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string;

    constructor(private http: HttpClient) { }

  signup(user): Observable<any>{
    return this.http.post<any>(`${config.api_url}/auth/register`, user);
    
  }
  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/auth`, user)
      .pipe(
	tap(data => {
	  if(data.success){
	    this.doLoginUser(user.email, data.value);
	  }
	}), catchError((error, value) => {
          console.log(error.error);
          return of(error);
	}));
  }

  logout() {
    return this.http.post<any>(`${environment.api_url}/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.api_url}/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  
  public doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }


  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  
  public parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  
  public hasRole(roles, check){
    return roles.some(role => check.indexOf(role) > -1);
  }
  
  public isAdmin(roles, check){
    return this.hasRole(roles,['user_admin']);
  }

}
