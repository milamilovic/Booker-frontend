import {Component, Input, OnInit} from '@angular/core';
import {object} from "@amcharts/amcharts5";
import {format} from "date-fns";
import {AccommodationCommentDTO} from "../../accommodation/accommodation/model/AccommodationCommentDTO";

@Component({
  selector: 'app-comment-card-accommodation',
  templateUrl: './comment-card-accommodation.component.html',
  styleUrls: ['./comment-card-accommodation.component.css']
})
export class CommentCardAccommodationComponent implements OnInit{
  @Input()
  comment: AccommodationCommentDTO;
  date: string = "";

  constructor() {
    this.comment = {
      "id": 0,
      "accommodationId": 0,
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
