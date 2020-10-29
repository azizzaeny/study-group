import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { RequestPassComponent } from './layouts/request-pass/request-pass.component';
import { ProfileUpdateComponent } from './layouts/profile-update/profile-update.component';
import { ResetPassComponent } from './layouts/reset-pass/reset-pass.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { UserListsComponent} from './layouts/user-lists/user-lists.component';
import { SignupConfirmComponent } from './layouts/signup-confirm/signup-confirm.component';
import { ViewEmailComponent } from './layouts/view-email/view-email.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AdminGuard} from './services/auth/admin.guard';
import {MemberGuard} from './services/auth/member.guard';


const routes: Routes = [
 
  // Guard public when Logged in
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]}, 
  { path: 'request-password', component: RequestPassComponent, canActivate:[AuthGuard] },
  { path: 'reset-password', component: ResetPassComponent, canActivate:[AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // Guard to 404 when not logged In
  { path: 'dashboard', component: DashboardComponent, canActivate:[AdminGuard]},
  { path: 'dashboard/users', component: UserListsComponent, canActivate:[AdminGuard]},
  // guard member area 
  { path: 'dashboard/profile', component: ProfileComponent, canActivate: [MemberGuard],  },
  { path: 'dashboard/profile/update', component: ProfileUpdateComponent, canActivate:[MemberGuard] },
  //specialpage
  { path: 'singup-confirm/:email', component: SignupConfirmComponent},
  { path: 'view-email/:email', component: ViewEmailComponent},  
  { path: '**', component: DefaultComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
