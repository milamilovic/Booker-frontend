import {Component, Input, OnInit} from '@angular/core';
import {Owner} from "../../user/owner-view/model/owner.model";
import {UserType} from "../../enums/user-type.enum";
import {ProfilePicture} from "../../user/model/ProfilePicture";
import {object} from "@amcharts/amcharts5";
import {OwnerCommentDTO} from "../../user/dto/OwnerCommentDTO";
import {CommentsAndRatingsService} from "../comments-and-ratings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-owner-comments-card',
  templateUrl: './owner-comments-card.component.html',
  styleUrls: ['./owner-comments-card.component.css']
})
export class OwnerCommentsCardComponent implements OnInit{
  @Input()
  owner : Owner;

  comments: OwnerCommentDTO[] = [];

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
    this.service.getAllCommentsForOwner(this.owner.id).subscribe({
      next: (data : OwnerCommentDTO[]) => {
        this.comments = data;
      },
      error: (_)=> {
        console.log("Error with owner comments!");
      }
    })
  }

  delete(id:number){
    this.service.deleteComment(id).subscribe({
      next(data){
        alert("Deleted comment!");
        location.reload();
      },
      error(_){
        console.log("Error with comment deletion!");
      }
    })
  }

  openOwnerProfile(id: number) {
    console.log("owner id: " + id);
    this.router.navigate(['/owner/', id]);
  }

}
