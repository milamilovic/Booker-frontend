import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListingComponent } from './accommodation-listing/accommodation-listing.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { AccommodationComponent } from './accommodation/accommodation.component';
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { OwnerAccommodationListingComponent } from './owner-accommodation-listing/owner-accommodation-listing.component';
import { OwnerAccommodationCardComponent } from './owner-accommodation-card/owner-accommodation-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateAccommodationComponent } from './update-accommodation/update-accommodation.component';
import {MapModule} from "../map/map.module";



@NgModule({
  declarations: [
    AccommodationListingComponent,
    AccommodationCardComponent,
    AccommodationCardComponent,
    OwnerAccommodationListingComponent,
    OwnerAccommodationCardComponent,
    UpdateAccommodationComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    RouterLink,
    MatInputModule,
    MatDatepickerModule,
    AccommodationComponent,
    FormsModule,
    ReactiveFormsModule,
    MapModule
  ],
  exports: [
    AccommodationComponent
  ]
})
export class AccommodationModule { }
