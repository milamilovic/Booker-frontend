import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestReservationCardComponent } from './guest-reservation-card/guest-reservation-card.component';
import {MatCardModule} from "@angular/material/card";
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    GuestReservationCardComponent,
    GuestReservationsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    GuestReservationCardComponent,
    GuestReservationsComponent
  ]
})
export class ReservationsModule { }
