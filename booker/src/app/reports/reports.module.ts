import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateIntervalReportComponent } from './date-interval-report/date-interval-report.component';
import { AccommodationReportComponent } from './accommodation-report/accommodation-report.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../infrastructure/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AccommodationReportComponent,
    DateIntervalReportComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule
  ]
})
export class ReportsModule { }
