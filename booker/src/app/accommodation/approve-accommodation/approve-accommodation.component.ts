import {Component, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-approve-accommodation',
  templateUrl: './approve-accommodation.component.html',
  styleUrls: ['./approve-accommodation.component.css']
})
export class ApproveAccommodationComponent implements OnInit {
  accommodations: AccommodationListingDto[] = [];
  clickedAcc: string = ''

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service.getAllUnAccepted().subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      }
    });
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }
}
