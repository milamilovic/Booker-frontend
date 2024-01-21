import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestCardComponent } from './guest-card/guest-card.component';
import { OwnerCardComponent } from './owner-card/owner-card.component';
import { GuestRequestsComponent } from './guest-requests/guest-requests.component';
import { OwnerRequestsComponent } from './owner-requests/owner-requests.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../infrastructure/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    GuestCardComponent,
    OwnerCardComponent,
    GuestRequestsComponent,
    OwnerRequestsComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule
  ],
  exports: [
    GuestRequestsComponent,
    OwnerRequestsComponent
  ]
})
export class RequestsModule { }
