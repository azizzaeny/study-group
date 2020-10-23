import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    public getApi() {
        return this.http.get<any>(`${environment.api_url}/api`)
            .pipe(map(data => data.value));
    }
}
