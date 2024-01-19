import {Component, Input, OnInit} from '@angular/core';
import {OwnerCommentDTO} from "../../user/dto/OwnerCommentDTO";
import {OwnerRatingDTO} from "../../user/dto/OwnerRatingDTO";
import {CommentsAndRatingsService} from "../comments-and-ratings.service";
import {UserType} from "../../enums/user-type.enum";
import {object} from "@amcharts/amcharts5";
import {Owner} from "../../user/owner-view/model/owner.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-owner-ratings-card',
  templateUrl: './owner-ratings-card.component.html',
  styleUrls: ['./owner-ratings-card.component.css']
})
export class OwnerRatingsCardComponent implements OnInit{
  @Input()
  owner : Owner;

  ratings: OwnerRatingDTO[] = [];

  constructor(private service:CommentsAndRatingsService,
              private router: Router) {
    this.owner =  {
      "id": 0,
      "name": "",
      "surname": "",
      "email": "",
      "address": "",
      "phone": "",
      "password": "",
      "role": UserType.OWNER,
      "profilePicture": {
        "id":0,
        "path": "",
        "user": object
      },
      "reported": false,
      "blocked": false,
      "deleted": false,
      "requestNotificationEnabled": false,
      "cancellationNotificationEnabled": false,
      "ratingNotificationEnabled": false,
      "accNotificationEnabled": false
    }
  }

  ngOnInit(): void {
    this.service.getAllRatingsForOwner(this.owner.id).subscribe({
      next: (data : OwnerRatingDTO[]) => {
        this.ratings = data;
      },
      error: (_)=> {
        console.log("Error with owner ratings!");
      }
    })
  }

  delete(id:number){
    this.service.deleteRating(id).subscribe({
      next(data){
        alert("Deleted rating!");
        location.reload();
      },
      error(_){
        console.log("Error with rating deletion!");
      }
    })
  }

  openOwnerProfile(id: number) {
    this.router.navigate(['/owner/', id]);
  }
}
