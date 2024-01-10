import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestReservationCardComponent } from './guest-reservation-card/guest-reservation-card.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    GuestReservationCardComponent
  ],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class ReservationsModule { }
