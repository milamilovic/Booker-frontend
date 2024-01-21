import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from "../model/Reservation";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {Router} from "@angular/router";
import {ReservationService} from "../reservation.service";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {format} from "date-fns";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {Guest} from "../../user/guest-view/model/guest.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-owner-reservation-card',
  templateUrl: './owner-reservation-card.component.html',
  styleUrls: ['./owner-reservation-card.component.css']
})
export class OwnerReservationCardComponent implements OnInit{
  @Input()
  reservation: Reservation;
  // @ts-ignore
  accommodation: AccommodationViewDto;
  // @ts-ignore
  guest: Guest;
  cancelled: number = 0;
  rating: string = "";
  deadlineDays: number = 0;
  deadline: string = "";

  constructor(private router: Router,
              private service: ReservationService,
              private accommodationService: AccommodationService,
              private userService: UserService) {
    console.log("dunja");
    this.reservation = {
      "guestId": NaN,
      "accommodationId": 0,
      "id": 0,
      "fromDate": "2024-03-01",
      "toDate": "2024-03-10",
      "numberOfGuests": 0,
      "requestStatus": 0,
      "status": 0,
      "deleted": false,
      "price": 0.0
    }
  }

  ngOnInit() {
    const accommodationId = this.reservation.accommodationId;
    if (accommodationId !== undefined) {
      this.accommodationService.getAccommodation(accommodationId).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
          this.deadlineDays = this.accommodation.deadline;
          let deadlineDate = new Date(this.reservation.fromDate);
          this.deadline = format(new Date(deadlineDate.getTime() - (this.deadlineDays * 24 * 60 * 60 * 1000)), "dd.MM.yyyy.");
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
      this.userService.getGuestById(this.reservation.guestId).subscribe({
        next: (data: Guest) => {
          this.guest = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
      this.userService.getCancelled(this.reservation.guestId).subscribe({
        next: (data: number) => {
          this.cancelled = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
      let ratings = this.accommodationService.getRatings(accommodationId).subscribe({
        next: (data: AccommodationRating[]) => {
          let sum = 0;
          for (let index in data) {
            sum += data[index].rate;
          }
          let ratingNum = sum / data.length;
          if (isNaN(ratingNum)) {
            this.rating = "No ratings yet     "
          } else {
            this.rating = '                 ' + ratingNum.toString() + ' / 5.0';
          }
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }
  }

  openAccommodation():void{
    this.router.navigate(['accommodation', this.accommodation.id]);
  }
}
