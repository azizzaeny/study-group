import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject, Observable, of, throwError } from 'rxjs';                  

const config = {
  api_url: environment.api_url
}

export class IUser{
  first_name : string;
  last_name : string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  users:any;
  users$: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getUsers() {
    // if(this.users){
    //   this.users$.next();
    // }
    return this.http.get<any>(`${config.api_url}/users`).subscribe(users => this.users$.next(users.value));
  }
}
