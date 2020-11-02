import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError, Subject, } from 'rxjs';                                                                                          
const config = {
  api_url: environment.api_url
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users;
  users$: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  

  public resetPassword(payload){
    return this.http.post<any>(`${config.api_url}/auth/reset-password`, payload).pipe(tap(_=> console.log('seding', payload), catchError(err=>{
      console.log(err);
      return of(err);
    })));
  }


  public requestResetPassword(payload){
    return this.http.post<any>(`${config.api_url}/auth/request-password`, payload).pipe(tap(_ =>{
      console.log('sending', payload)
    }, catchError(err =>{
      console.log(err);
      return of(err);
    })));
  }

  public getUserLists() : Observable<any>{
    return this.http.get<any>(`${config.api_url}/users`)
      .pipe(
	map(data => JSON.stringify({...data})),
	map(data => JSON.parse(data)),
	catchError((error, value) =>{
	  console.log(error.error);
	  return of(error);
	})
      );
  }
  public updateProfilePic(payload){
    return this.http.put<any>(`${config.api_url}/users/profile-picture`, payload)
  }
  
  public updateProfile(payload){
    return this.http.put<any>(`${config.api_url}/users/profile`, payload);  
  }
  
  public updateAuthProfile(payload){
    return this.http.put<any>(`${config.api_url}/users/set-password`, payload);
  }

  public addUser(email, users){
    let em = email;
    return this.http.put<any>(`${config.api_url}/users/`, users);
  }
  
  public updateUser(email,users){
    console.log(email);
    console.log(users)
    return this.http.put<any>(`${config.api_url}/users/email/${email}`, users).pipe(map(data => data), catchError((err, value)=>{ 
      console.log(err);
      return of(err);
    }));
  }
  
  public deleteUser(email): Observable<any>{
    return this.http.delete<any>(`${config.api_url}/users/email/${email}`).pipe(map(data => data));
  }
  
  public getInitalSeeds(){
    return this.http.get<any>(`${config.api_url}/users/secret`).pipe(map(data => data.value)); 
  }
  public getProfileUser(){
    return this.http.get<any>(`${config.api_url}/users/profile`).pipe(map(data=> data));
  }
  public getProfileUserTry(){
    return this.http.get<any>(`${config.api_url}/users/profile?email=f@gmail.com`);
  }
  
}
