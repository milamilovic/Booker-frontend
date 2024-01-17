import {Component, Input, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {CommentsAndRatingsService} from "../comments-and-ratings.service";
import {AccommodationCommentDTO} from "../../accommodation/accommodation/model/AccommodationCommentDTO";

@Component({
  selector: 'app-accommodation-ratings-card',
  templateUrl: './accommodation-ratings-card.component.html',
  styleUrls: ['./accommodation-ratings-card.component.css']
})
export class AccommodationRatingsCardComponent implements OnInit{
  @Input()
  accommodation: AccommodationListingDto;

  ratings: AccommodationRating[] = [];

  constructor(private service:CommentsAndRatingsService) {
    this.accommodation = {
      "id": 0,
        "title": "",
        "description": "",
        "image": {
        "id": 0,
          "path_front": "",
          "path_mobile": ""
      },
      "rating": 0,
        "totalPrice": 0,
        "pricePerDay": 0
    }
  }

  ngOnInit(): void {
    if(this.accommodation && this.accommodation.id) {
      this.service.getAllRatingsForAccommodation(this.accommodation.id).subscribe({
        next: (data: AccommodationRating[]) => {
          console.log("accommodation id " + this.accommodation.id + ": " + data);
          this.ratings = data;
        },
        error: (_) => {
          console.log("Error with accommodation ratings!");
        }
      })
    }
  }

  delete(id:number){
    this.service.deleteAccommodationRating(id).subscribe({
      next(data){
        alert("Deleted rating!");
        location.reload();
      },
      error(_){
        console.log("Error with rating deletion!");
      }
    })
  }

}
