import {Component, Input, OnInit} from '@angular/core';
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {AccommodationCommentDTO} from "../../accommodation/accommodation/model/AccommodationCommentDTO";
import {CommentsAndRatingsService} from "../comments-and-ratings.service";
import {object} from "@amcharts/amcharts5";
import {Owner} from "../../user/owner-view/model/owner.model";
import {UserService} from "../../user/user.service";
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accommodation-comments-card',
  templateUrl: './accommodation-comments-card.component.html',
  styleUrls: ['./accommodation-comments-card.component.css']
})
export class AccommodationCommentsCardComponent implements OnInit{
  @Input()
  accommodation:AccommodationListingDto;

  comments:AccommodationCommentDTO[] = [];

  constructor(private service:CommentsAndRatingsService,
              private router: Router) {
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
      this.service.getAllCommentsForAccommodation(this.accommodation.id).subscribe({
        next: (data: AccommodationCommentDTO[]) => {
          this.comments = data;
        },
        error: (_) => {
          console.log("Error with accommodation comments!");
        }
      })
    }
  }

  delete(id:number){
    this.service.deleteAccommodationComment(id).subscribe({
      next: (data) => {
        alert("Deleted comment!");
        if (this.accommodation && this.accommodation.id) {
          this.service.getAllCommentsForAccommodation(this.accommodation.id).subscribe({
            next: (data: AccommodationCommentDTO[]) => {
              this.comments = data;
            },
            error: (_) => {
              console.log("Error with accommodation comments!");
            }
          });
        }
      },
      error(_){
        console.log("Error with comment deletion!");
      }
    })
  }

  approve(id:number) {
    this.service.approveAccommodationComment(id).subscribe({
      next:(data) =>{
        alert("Approved comment!");
        if (this.accommodation && this.accommodation.id) {
          this.service.getAllCommentsForAccommodation(this.accommodation.id).subscribe({
            next: (data: AccommodationCommentDTO[]) => {
              this.comments = data;
            },
            error: (_) => {
              console.log("Error with accommodation comments!");
            }
          });
        }
      },
      error(_) {
        console.log("Error with comment approval!");
      }
    })
  }

  openAccommodation() {
    if(this.accommodation && this.accommodation.id) {
      this.router.navigate(['accommodation/', this.accommodation.id]);
    }
  }

}
