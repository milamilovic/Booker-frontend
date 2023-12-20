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

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.loggedInId = Number(localStorage.getItem("loggedId"));
    this.service.getAllForOwner(this.loggedInId).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }

}
