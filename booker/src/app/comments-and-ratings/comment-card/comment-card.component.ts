import {Component, Input, OnInit} from '@angular/core';
import {OwnerCommentDTO} from "../../user/dto/OwnerCommentDTO";
import {ProfilePicture} from "../../user/model/ProfilePicture";
import {object} from "@amcharts/amcharts5";
import {format} from "date-fns";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit{
  @Input()
  comment: OwnerCommentDTO;
  date: string = "";

  constructor() {
    this.comment = {
      "id": 0,
      "ownerId": 0,
      "guestId": 0,
      "guestName": "",
      "guestSurname": "",
      "guestProfilePicture": {
        "id": 0,
        "path": "",
        "user": object
      },
      "content": "",
      "rating": 0,
      "date": new Date(),
      "reported": false,
      "deleted": false,
      "approved": false
    }
  }

  ngOnInit() {
    if (this.comment && this.comment.date) {
      this.date = format(this.comment.date, "dd.MM.yyyy.");
    }
  }

}
