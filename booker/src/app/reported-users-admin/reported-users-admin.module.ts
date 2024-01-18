import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingCardComponent } from './reporting-card/reporting-card.component';
import {MatCardModule} from "@angular/material/card";
import { UserReportsComponent } from './user-reports/user-reports.component';



@NgModule({
  declarations: [
    ReportingCardComponent,
    UserReportsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ReportedUsersAdminModule { }
