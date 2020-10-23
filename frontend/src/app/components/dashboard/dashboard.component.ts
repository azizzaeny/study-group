import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { DashboardService } from './dashboard.service';
import { AuthService } from '../../components/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }

    logout() {
        this.authService.logout()
            .subscribe(success => {
                if (success) {
                    this.router.navigate(['/login']);
                }
            });
    }

}
