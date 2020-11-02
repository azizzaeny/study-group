import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {DashboardGuard} from './dashboard.guard';
import { TokenInterceptor } from './token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[AuthGuard,
	     AuthService, DashboardGuard,
	     {
	       provide: HTTP_INTERCEPTORS,
	       useClass: TokenInterceptor
	     }
	    ]
})
  export class AuthModule { }
