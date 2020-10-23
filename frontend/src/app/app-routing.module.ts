import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/components/login.component';
import { AuthGuard } from './components/auth/auth.guard';
import { DashboardGuard } from './components/auth/dashboard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        canActivate: [DashboardGuard],
        canLoad: [DashboardGuard],
        component: DashboardComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
