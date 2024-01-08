import {Component, ElementRef} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {FavouriteAccommodation} from "../accommodation/model/favourite-accommodation";

@Component({
  selector: 'app-favourite-accommodations',
  templateUrl: './favourite-accommodations.component.html',
  styleUrls: ['./favourite-accommodations.component.css']
})
export class FavouriteAccommodationsComponent {
  accommodations: FavouriteAccommodation[] = [];

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
    let loggedIn = Number(localStorage.getItem("loggedId"));
    this.service.getFavourites(loggedIn).subscribe({
      next: (data: FavouriteAccommodation[]) => {
        this.accommodations = data;
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }
}
