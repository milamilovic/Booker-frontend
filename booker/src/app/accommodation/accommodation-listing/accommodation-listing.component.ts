import {Component, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-accommodation-listing',
  templateUrl: './accommodation-listing.component.html',
  styleUrls: ['./accommodation-listing.component.css']
})
export class AccommodationListingComponent implements OnInit {
  accommodations: AccommodationListingDto[] = [];
  clickedAcc: string = ''

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
    this.service.searchAccommodations('23.23.2323.', '23.23.2323.', 'novi sad', 1).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }
}
