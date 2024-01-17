import {Component, Input, OnInit} from '@angular/core';
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {Guest} from "../../user/guest-view/model/guest.model";
import {UserService} from "../../user/user.service";
import {format} from "date-fns";
import {object} from "@amcharts/amcharts5";
import {User} from "../../user/model/user.model";
import {UserType} from "../../enums/user-type.enum";
import {ProfilePicture} from "../../user/model/ProfilePicture";

@Component({
  selector: 'app-rating-card-accommodation',
  templateUrl: './rating-card-accommodation.component.html',
  styleUrls: ['./rating-card-accommodation.component.css']
})
export class RatingCardAccommodationComponent implements OnInit{
  @Input()
  rate: AccommodationRating;

  guest!: Guest;
  date: string = "";

  constructor(private userService: UserService) {
    this.rate = {
      "id": 0,
      "accommodationId": 0,
      "guestId": 0,
      "rate": 0,
      "date": new Date(),
      "reported": false,
      "deleted": false
    }
  }

  ngOnInit(): void {
    console.log("rate: " + this.rate.guestId);
    this.userService.getGuestById(this.rate.guestId).subscribe({
      next: (data: Guest)=> {
        console.log("guest: " + data);
        this.guest = data;
      },
      error: (_) => {
        console.log("Error with guest");
      }
    })

    if (this.rate && this.rate.date) {
      this.date = format(this.rate.date, "dd.MM.yyyy.");
    }
  }

}
