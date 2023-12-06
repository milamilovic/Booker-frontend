import {Component, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accommodation-listing',
  templateUrl: './accommodation-listing.component.html',
  styleUrls: ['./accommodation-listing.component.css']
})
export class AccommodationListingComponent implements OnInit {
  accommodations: AccommodationListingDto[] = [];
  clickedAcc: string = ''
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  people: number = 0;

  constructor(private service: AccommodationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.startDate = String(params['startDate']);
      this.endDate = String(params['endDate']);
      this.location = String(params['location']);
      this.people = +params['people'];
      console.log("parametri: " + this.startDate + ", " + this.endDate + ", " + this.location + ", " + this.people)
      this.service.searchAccommodations(this.startDate, this.endDate, this.location, this.people).subscribe({
        next: (data: AccommodationListingDto[]) => {
          this.accommodations = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    })
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }
}
