import {Component, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {FavouriteAccommodation} from "../accommodation/model/favourite-accommodation";

@Component({
  selector: 'app-approve-accommodation',
  templateUrl: './approve-accommodation.component.html',
  styleUrls: ['./approve-accommodation.component.css']
})
export class ApproveAccommodationComponent implements OnInit {
  accommodations: AccommodationListingDto[] = [];

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service.getAllUnAccepted().subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      }
    });
  }

  handleEvent(acc: AccommodationListingDto) {
    alert("Approved " + acc.title +  " accommodation!")
    this.service.getAllUnAccepted().subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      }
    });
  }

}
