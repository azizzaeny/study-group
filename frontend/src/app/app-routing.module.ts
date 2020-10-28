import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { LoginComponent } from './components/auth/components/login.component';
//import { AuthGuard } from './modules/auth/auth.guard';
//import { DashboardGuard } from './modules/auth/dashboard.guard';

//import { DashboardComponent } from './components/dashboard/dashboard.component';

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

const routes: Routes = [
  
  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [AuthGuard]
  // },

  // {
  //   path: 'dashboard',
  //   canActivate: [DashboardGuard],
  //   canLoad: [DashboardGuard],
  //   component: DashboardComponent
  // }

  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  
  { path: 'dashboard',
    // canActivate : [DashboardGuard],
    // canLoad: [DashboardGuard],
    component: DashboardComponent},

  // { path: 'post/:id/:slug', loadChildren: () => import('./post/post.module').then(m => m.PostModule), data: {routeState: 3} },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard/profile', component: ProfileComponent },
  { path: 'dashboard/profile/update', component: ProfileUpdateComponent},
  { path: 'dashboard/users', component: UserListsComponent}, // add & update as overlay
  { path: 'request-password', component: RequestPassComponent, },
  { path: 'reset-password', component: ResetPassComponent, data: {routeState: 7} },
  { path: 'signup', component: SignupComponent,},
  
  // { path: 'dashboard/users', component: UserListsComponent, data: {routeState: 2} },
  
  { path: '**', component: DefaultComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
