import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//import {AuthModule} from './services/auth/auth.module';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { DashboardGuard } from './services/auth/dashboard.guard';
import { MemberGuard } from './services/auth/member.guard';

import { TokenInterceptor } from './services/auth/token.interceptor';

import {UserService} from './services/user/user.service';

import { ProfileComponent } from './layouts/profile/profile.component';
import { ProfileUpdateComponent } from './layouts/profile-update/profile-update.component';
import { RequestPassComponent } from './layouts/request-pass/request-pass.component';
import { ResetPassComponent } from './layouts/reset-pass/reset-pass.component';
import { UserListsComponent } from './layouts/user-lists/user-lists.component';
import { UserFormComponent } from './layouts/user-form/user-form.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { HomeComponent } from './layouts/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import {ButtonComponent} from './components/button/button.component';
import {BadgeComponent} from './components/badge/badge.component';
import {CardComponent} from './components/card/card.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {InputComponent} from './components/input/input.component';
import {ToastComponent} from './components/toast/toast.component';
import { LogoComponent } from './components/logo/logo.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { LoginComponent } from './layouts/login/login.component';
import { BannerComponent } from './components/banner/banner.component';
import { ViewEmailComponent } from './layouts/view-email/view-email.component';
import { SignupConfirmComponent } from './layouts/signup-confirm/signup-confirm.component';
import {MemberService} from './services/user/member.service';
import { UserAddComponent } from './layouts/user-add/user-add.component';
import { UserUpdateComponent } from './layouts/user-update/user-update.component';
import { UserDeleteConfirmComponent } from './layouts/user-delete-confirm/user-delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent,
    HomeComponent,
    SignupComponent,
    UserFormComponent,
    UserListsComponent,
    ResetPassComponent,
    RequestPassComponent,
    ProfileUpdateComponent,
    ProfileComponent,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    DropdownComponent,
    InputComponent,
    ToastComponent,
    LogoComponent,
    LoginComponent,
    BannerComponent,
    ViewEmailComponent,
    SignupConfirmComponent,
    UserAddComponent,
    UserUpdateComponent,
    UserDeleteConfirmComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,  AuthService, DashboardGuard, UserService, MemberGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
