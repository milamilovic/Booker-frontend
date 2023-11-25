import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListingComponent } from './accommodation-listing/accommodation-listing.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
  declarations: [
    AccommodationListingComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class AccommodationModule { }
