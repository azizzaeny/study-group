import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DashboardGuard } from './dashboard.guard';
import { TokenInterceptor } from './token.interceptor';
import { LoginComponent } from './components/login.component';

const tokenInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        DashboardGuard,
        tokenInterceptor
    ],
  
  exports:[LoginComponent]
})
export class AuthModule { }
