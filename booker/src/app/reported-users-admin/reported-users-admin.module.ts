import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingCardComponent } from './reporting-card/reporting-card.component';
import {MatCardModule} from "@angular/material/card";
import { UserReportsComponent } from './user-reports/user-reports.component';
import { ReportedUsersComponent } from './reported-users/reported-users.component';



@NgModule({
  declarations: [
    ReportingCardComponent,
    UserReportsComponent,
    ReportedUsersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ReportedUsersAdminModule { }
