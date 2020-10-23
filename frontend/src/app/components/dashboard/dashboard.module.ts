import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material';
import { DashboardRoutingModule } from './dashboard.routing.module';



@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        DashboardRoutingModule

    ]
})
export class DashboardModule { }
