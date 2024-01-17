import {Component, Input, OnInit} from '@angular/core';
import {OwnerRatingDTO} from "../../user/dto/OwnerRatingDTO";
import {object} from "@amcharts/amcharts5";
import {Guest} from "../../user/guest-view/model/guest.model";
import {UserService} from "../../user/user.service";
import {format} from "date-fns";

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent implements OnInit {
  @Input()
  rate: OwnerRatingDTO;
  guest!: Guest;
  date: string = "";

  constructor(private userService: UserService) {
    this.rate = {
      "id": 0,
      "ownerId": 0,
      "guestId": 0,
      "rate": 0,
      "date": new Date(),
      "reported": false,
      "deleted": false
    }
  }

  ngOnInit(): void {
    this.userService.getGuestById(this.rate.guestId).subscribe({
      next:(data:Guest)=>{
        this.guest = data;
      }
    })

    if (this.rate && this.rate.date) {
      this.date = format(this.rate.date, "dd.MM.yyyy.");
    }
  }

}
