import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
    }

    get control() { return this.loginForm.controls; }


    login() {
        this.authService.login({
            username: this.control.username.value,
            password: this.control.password.value
        }).subscribe(success => {
            if (success) {
                this.router.navigate(['/dashboard']);
            }
        });
    }
}
