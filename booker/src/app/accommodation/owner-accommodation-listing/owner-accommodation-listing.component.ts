import {Component, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-owner-accommodation-listing',
  templateUrl: './owner-accommodation-listing.component.html',
  styleUrls: ['./owner-accommodation-listing.component.css']
})
export class OwnerAccommodationListingComponent implements OnInit{
  accommodations: AccommodationListingDto[] = [];
  clickedAcc: string = ''
  loggedInId : number = 0;
  acceptedAccommodations: AccommodationListingDto[] = [];

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.loggedInId = Number(localStorage.getItem("loggedId"));
    this.service.getAllForOwner(this.loggedInId).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      },
      error: (_) => {
        console.log("Error with all accommodation for owner " + this.loggedInId + " !")
      }
    });
    this.service.getAcceptedForOwner(this.loggedInId).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.acceptedAccommodations = data
      },
      error: (_) => {
        console.log("Error with accepted accommodation for owner " + this.loggedInId + " !")
      }
    })
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }

}
