import {Component, OnInit} from '@angular/core';
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";

@Component({
  selector: 'app-accommodation-comments-and-ratings',
  templateUrl: './accommodation-comments-and-ratings.component.html',
  styleUrls: ['./accommodation-comments-and-ratings.component.css']
})
export class AccommodationCommentsAndRatingsComponent implements OnInit{
  accommodations : AccommodationListingDto[] = [];

  constructor(private accService: AccommodationService) {
  }

  ngOnInit() {
    this.accService.getAllAccommodations().subscribe({
      next: (data:AccommodationListingDto[])=>{
        this.accommodations = data;
      },
      error: (_) => {
        console.log("Error with accommodations!")
      }
    })
  }

}
