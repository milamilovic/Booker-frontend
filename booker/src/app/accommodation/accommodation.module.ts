import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListingComponent } from './accommodation-listing/accommodation-listing.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { AccommodationComponent } from './accommodation/accommodation.component';
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AccommodationListingComponent,
    AccommodationComponent,
    AccommodationCardComponent,
    AccommodationCardComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    RouterLink
  ]
})
export class AccommodationModule { }
