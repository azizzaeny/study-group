import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { map } from 'rxjs/operators';

const config = {
  api_url: environment.api_url
}

console.log(`${config.api_url}/users/secret`);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  public getInitalSeeds(){
    return this.http.get<any>(`${config.api_url}/users/secret`).pipe(map(data => data.value));
  }
  public getProfileUser(){
    return this.http.get<any>(`${config.api_url}/users/profile`);
  }
}
